from datetime import datetime
from uuid import uuid4

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from send_me.database.engine import get_db

from . import schemas

"PLEASE PUT STATIC DATA IN THE router.get FUNCTION"

router = APIRouter(
    tags=["conversations"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "/conversation/tags",
    response_model=list[schemas.Conversation],
    operation_id="list_conversations",
)
def get_conversations(
    db: Session = Depends(get_db),
):
    # query = select(models.Conversation).order_by(models.Conversation.most_recent.desc())

    # result = db.execute(query).scalars().all()

    return [
        schemas.Conversation(
            id=uuid4(),
            user="Oak Tree Church of Christ",
            last_updated=datetime.now(),
            most_recent="Hey! I heard about Servant's Day and would love to contribute...",
            is_read=False,
        ),
        schemas.Conversation(
            id=uuid4(),
            user="Hope Haven Community Center",
            last_updated=datetime.now(),
            most_recent="Sure! We’re always looking for volunteers to help around the church.",
            is_read=False,
        ),
        schemas.Conversation(
            id=uuid4(),
            user="New Light Church of Christ",
            last_updated=datetime.now(),
            most_recent="We have an opening for a 5th grade teacher. We saw you had...",
            is_read=True,
        ),
        schemas.Conversation(
            id=uuid4(),
            user="Estes Church of Christ",
            last_updated=datetime.now(),
            most_recent="We wanted to take a moment to thank you for your incredible...",
            is_read=True,
        ),
    ]
