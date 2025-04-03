from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from datetime import datetime
from uuid import uuid4

from send_me.database.engine import get_db

from . import models, schemas

"PLEASE PUT STATIC DATA IN THE router.get FUNCTION"

router = APIRouter(
    tags=["messages"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "/messages/tags",
    response_model=list[schemas.Message],
    operation_id="list_messages",
)
def get_conversations(
    db: Session = Depends(get_db),
):
    query = select(models.Message).order_by(models.Message.created_at.desc())

    # result = db.execute(query).scalars().all()

    return [
        schemas.Message(
            id=uuid4(),
            isUser=True,
            text="Hey! I heard about Servant’s Day and I would love to contribute. Do you have any open projects?",
            conversation_id=0,
            created_at=datetime.now()
        ),
        schemas.Message(
            id=uuid4(),
            isUser=False,
            text="We desperately need people to paint Bradfield Hall’s lobby if you’re interested.",
            conversation_id=0,
            created_at=datetime.now()
        ),
        schemas.Message(
            id=uuid4(),
            isUser=True,
            text="That sounds great! I have lots of experience painting so I think I could be a good fit. What’s the next step?",
            conversation_id=0,
            created_at=datetime.now()
        ),]