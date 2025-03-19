import logging
import secrets
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.orm import Session

from send_me.database.engine import get_db
from send_me.modules.users.models import User

from . import models, schemas, utils

TEN_MINUTES_OLD = timedelta(minutes=10)

router = APIRouter(
    prefix="/auth",
    tags=["authentication"],
    responses={404: {"description": "Not Found"}},
)


@router.post(
    "/pin",
    response_model=schemas.LoginChallengeResponse,
)
def request_pin(input: schemas.LoginChallengeRequest, db: Session = Depends(get_db)):
    # Check if user exists
    user_query = select(User).where(User.email == input.email)

    user = db.execute(user_query).scalar()

    if not user:
        # We discussed creating a user if one does exist which would involve a redirect
        # For now one is just forced to be created.
        user = User(email=input.email, username=input.email)
        db.add(user)
        db.flush()
        db.refresh(user)

    # Create a login
    login_challenge = models.LoginChallenge(
        code=str(secrets.randbelow(1_000_000)),
        login_challenge_token=str(secrets.token_urlsafe(16)),
        email=input.email,
    )

    email_sent = utils.send_email(login_challenge.email, login_challenge.code)

    # To avoid development dependancies this check can be ignored in dev mode
    if not email_sent and utils.SENDGRID_API_KEY != "":
        raise HTTPException(status_code=500, detail="Error when sending email")

    # Add login_challenge to DB
    # I think there is likely a better way to do this
    insert_command = insert(models.LoginChallenge).values(
        code=login_challenge.code,
        login_challenge_token=login_challenge.login_challenge_token,
        email=login_challenge.email,
    )
    insert_command = insert_command.on_conflict_do_update(
        index_elements=[models.LoginChallenge.email],
        set_={
            models.LoginChallenge.code: login_challenge.code,
            models.LoginChallenge.login_challenge_token: login_challenge.login_challenge_token,
        },
    )

    db.execute(insert_command)

    # Dr. Casey has asked the pin be shared to the developer somehow if the backend was in dev mode
    if utils.SENDGRID_API_KEY == "":
        logging.info(login_challenge.code)

    # return token for future auth
    return {"login_challenge_token": login_challenge.login_challenge_token}


@router.post("/sessiontoken", response_model=schemas.SessionResponse)
def request_session(input: schemas.SessionRequest, db: Session = Depends(get_db)):
    # Check if pin and token are in db
    login_query = select(models.LoginChallenge).where(
        models.LoginChallenge.login_challenge_token == input.login_challenge_token,
        models.LoginChallenge.code == input.code,
    )

    login = db.execute(login_query).scalar()

    if not login:
        raise HTTPException(status_code=404, detail="Login not found")

    login_age = login.created_at - datetime.now(timezone.utc)

    if login_age > TEN_MINUTES_OLD:
        raise HTTPException(status_code=403, detail="TOKEN EXPIRED")

    # Create Session

    # Get user to create session
    user_query = select(User).where(User.email == login.email)
    user = db.execute(user_query).scalar()

    # The user should exist but just in case...
    if not user:
        raise HTTPException(status_code=404, detail="Unable to find user")

    session = models.Session(session_token=secrets.token_urlsafe(32), user=user)

    # Add new session to db
    session_upsert = insert(models.Session).values(
        session_token=session.session_token, user_id=session.user.id
    )
    session_upsert = session_upsert.on_conflict_do_update(
        index_elements=[models.Session.user_id],
        set_={models.Session.session_token: session.session_token},
    )
    db.execute(session_upsert)
    db.delete(login)
    db.flush()

    # return token for future auth
    return {"session_token": session.session_token}
