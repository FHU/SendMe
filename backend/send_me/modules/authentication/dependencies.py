from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.orm import Session

from send_me.database.engine import get_db
from send_me.modules.users.models import User

from . import models

TWENTY_FOUR_HOURS_OLD = timedelta(hours=24)


def get_token(request: Request) -> str | None:
    """
    Extracts the token from the Authorization header.
    Assumes the token follows the 'Bearer <token>' format.
    """

    token = request.cookies.get("token")
    return token


def get_session(
    db: Session = Depends(get_db), token: str | None = Depends(get_token)
) -> models.Session:
    session_query = select(models.Session).where(models.Session.session_token == token)

    session = db.execute(session_query).scalar()

    if not session:
        raise HTTPException(status_code=403, detail="Forbidden")

    session_delta = session.created_at - datetime.now(timezone.utc)

    if session_delta > TWENTY_FOUR_HOURS_OLD:
        db.delete(session)
        raise HTTPException(status_code=400, detail="Session Expired")

    return session


def get_user(session: models.Session = Depends(get_session)) -> User | None:
    return session.user
