import os
import secrets
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.orm import Session

from send_me.database.engine import get_db
from send_me.modules.users.models import User

from . import helpers, models, schemas

IN_DEVELOPMENT = os.environ.get("environment", "development") == "development"

TEN_MINUTES_OLD = timedelta(minutes=10)

router = APIRouter(
    prefix="/auth",
    tags=["authentication"],
    responses={404: {"description": "Not Found"}},
)


@router.post(
    "/pin",
    response_model=schemas.LoginResponse,
)
def request_pin(input: schemas.LoginRequest, db: Session = Depends(get_db)):
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
    login = models.Login(
        pin=str(secrets.randbelow(1_000_000)),
        login_token=str(secrets.token_urlsafe(16)),
        email=input.email,
    )

    email_sent = helpers.send_email(login.email, login.pin)

    # To avoid development dependancies this check can be ignored in dev mode
    if not email_sent and not IN_DEVELOPMENT:
        raise HTTPException(status_code=500, detail="Error when sending email")

    # Add login to DB
    # I think there is likely a better way to do this
    insert_command = insert(models.Login).values(
        pin=login.pin, login_token=login.login_token, email=login.email
    )
    insert_command = insert_command.on_conflict_do_update(
        index_elements=[models.Login.email],
        set_={models.Login.pin: login.pin, models.Login.login_token: login.login_token},
    )

    db.execute(insert_command)

    # Dr. Casey has asked the pin be shared to the developer somehow if the backend was in dev mode
    if IN_DEVELOPMENT:
        return {"login_token": login.login_token, "pin": login.pin}

    # return token for future auth
    return {"login_token": login.login_token}


@router.post("/sessiontoken", response_model=schemas.SessionResponse)
def request_session(input: schemas.SessionRequest, db: Session = Depends(get_db)):
    # Check if pin and token are in db
    login_query = select(models.Login).where(
        models.Login.login_token == input.login_token, models.Login.pin == input.pin
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
