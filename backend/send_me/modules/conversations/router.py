from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from send_me.database.engine import get_db

from . import models, schemas

"PLEASE PUT STATIC DATA IN THE router.get FUNCTION"

router = APIRouter(
    tags=["conversations"],
    responses={404: {"description": "Not found"}},
)


@router.get("/conversations", response_model=list[schemas.Conversation])
def get_conversations(db: Session = Depends(get_db)):
    query = select(models.Conversation).order_by(models.Conversation.created_at.desc())

    result = db.execute(query).scalars().all()

    return result
