from fastapi import Depends, Header, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
import datetime

from send_me.database.engine import get_db

from . import models


TWENTY_FOUR_HOURS_OLD = datetime.timedelta(hours=24)

def get_token(authorization: str = Header(...)):
    """
    Extracts the token from the Authorization header.
    Assumes the token follows the 'Bearer <token>' format.
    """
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization format")
    return authorization.split("Bearer ")[1]


def get_session(db: Session = Depends(get_db), token: str = Depends(get_token)):
    session_query = select(models.Session).where(models.Session.token == token)

    session: models.Session = db.execute(session_query).first()

    if not session:
        raise HTTPException(status_code=404, detail="Session Not Found")

    # TODO Check if Session is old
    session_delta = datetime.datetime(session.created_at) - datetime.datetime.now()

    if session_delta > TWENTY_FOUR_HOURS_OLD:
        db.delete(session)
        raise HTTPException(status_code=400, detail="Session Expired")

    return session
