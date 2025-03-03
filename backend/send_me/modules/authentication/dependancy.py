from datetime import datetime, timedelta, timezone

from fastapi import Depends, Header, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from send_me.database.engine import get_db

from . import models

TWENTY_FOUR_HOURS_OLD = timedelta(hours=24)


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

    session = db.execute(session_query).first()

    if not session:
        raise HTTPException(status_code=404, detail="Session Not Found")

    session_delta = session.created_at - datetime.now(timezone.utc)

    if session_delta > TWENTY_FOUR_HOURS_OLD:
        db.delete(session)
        raise HTTPException(status_code=400, detail="Session Expired")

    return session
