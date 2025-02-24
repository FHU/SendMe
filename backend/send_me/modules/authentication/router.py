import secrets

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from send_me.database.engine import get_db

from . import helpers, models, schemas

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
    query = select(models.User).where(models.User.email == input.email)

    result = db.execute(query)

    if not result:
        raise HTTPException(status_code=404, detail="User Not Found")

    # Create a login
    item = models.Login(
        pin=str(secrets.randbelow(1_000_000)),
        token=str(secrets.token_urlsafe(16)),
        email=input.email,
    )

    email_sent = helpers.send_email(item.email, item.pin)

    if not email_sent:
        raise HTTPException(status_code=500, detail="Error when sending email")

    # Add login to DB
    db.add(item)
    db.flush()
    db.refresh(item)

    # return token for future auth
    return {"token": item.token}


# TODO Create endpoint for starting session
@router.post("/sessiontoken", response_model=schemas.SessionRequest)
def request_session(input: schemas.SessionRequest, db: Session = Depends(get_db)):
    # Check if pin and token are in db
    query = select(models.Login).where(
        (models.Login.token == input.token) & (models.Login.pin == input.pin)
    )

    result = db.execute(query)

    if not result:
        raise HTTPException(status_code=404, detail="Login not found")

    # Not certain this will work based on not seeing this pattern in docs. Will need testing.
    db.delete(query)

    # TODO Finish figureing out session creating ie tying to a user
    # Create Session
    item = models.Session(
        token=secrets.token_urlsafe(32),
    )

    db.add(item)
    db.flush()
    db.refresh(item)

    # return token for future auth
    return {"token": item.token}
