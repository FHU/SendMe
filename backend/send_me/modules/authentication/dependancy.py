from fastapi import Depends, Header, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from send_me.database.engine import get_db

from . import models


def get_token(authorization: str = Header(...)):
    """
    Extracts the token from the Authorization header.
    Assumes the token follows the 'Bearer <token>' format.
    """
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization format")
    return authorization.split("Bearer ")[1]


def get_session(db: Session = Depends(get_db), token: str = Depends(get_token)):
    query = select(models.Session).where(models.Session.token == token)

    result: models.Session = db.execute(query).first()

    if not result:
        raise HTTPException(status_code=404, detail="Session Not Found")

    # TODO Check if Session is old
    if result.created_at == "Too Old":
        raise HTTPException(status_code=400, detail="Session Expired")

    return result
