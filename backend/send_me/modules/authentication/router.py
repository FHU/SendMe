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
        token=str(secrets.token_urlsafe(16)),
        email=input.email,
    )

    email_sent = helpers.send_email(login.email, login.pin)

    if not email_sent:
        raise HTTPException(status_code=500, detail="Error when sending email")

    # Add login to DB
    # I think there is likely a better way to do this
    insert_command = insert(models.Login).values(
        pin=login.pin, token=login.token, email=login.email
    )
    insert_command = insert_command.on_conflict_do_update(
        index_elements=[models.Login.email],
        set_={models.Login.pin: login.pin, models.Login.token: login.token},
    )

    db.execute(insert_command)

    # Dr. Casey has asked the pin be printed to the console in dev
    if os.environ.get("ENVIRONMENT", "FALSE") == "TRUE":
        print(login.pin)

    # return token for future auth
    return {"token": login.token}


@router.post("/sessiontoken", response_model=schemas.SessionResponse)
def request_session(input: schemas.SessionRequest, db: Session = Depends(get_db)):
    # Check if pin and token are in db
    login_query = select(models.Login).where(
        models.Login.token == input.token, models.Login.pin == input.pin
    )

    try:
        login = db.execute(login_query).scalar()
    except:
        raise HTTPException(
            status_code=500, detail="An error occured when looking for your login"
        )

    if not login:
        raise HTTPException(status_code=404, detail="Login not found")

    time_delta = login.created_at - datetime.now(timezone.utc)

    if time_delta > TEN_MINUTES_OLD:
        raise HTTPException(status_code=403, detail="TOKEN EXPIRED")

    # Create Session

    # Get user to create session
    user_query = select(User).where(User.email == login.email)
    user = db.execute(user_query).scalar()

    # The user should exist but just in case...
    if not user:
        raise HTTPException(status_code=404, detail="Unable to find user")

    session = models.Session(token=secrets.token_urlsafe(32), user=user)

    # Add new session to db
    db.add(session)
    db.delete(login)
    db.flush()
    db.refresh(session)

    # return token for future auth
    return {"token": session.token}
