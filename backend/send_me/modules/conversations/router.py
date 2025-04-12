# This import is for testing
import secrets
import uuid
from datetime import datetime

from fastapi import APIRouter, Depends, Response
from sqlalchemy import select
from sqlalchemy.orm import Session as DatabaseSession
from sqlalchemy.orm.relationships import schema

from send_me.database.engine import get_db
from send_me.modules.authentication.dependencies import get_user
from send_me.modules.authentication.models import Session
from send_me.modules.users.models import User

from . import models, schemas

router = APIRouter(
    tags=["conversations"],
    responses={404: {"description": "Not found"}},
    prefix="/conversations",
)


# List Conversations
@router.get(
    "/",
    response_model=list[schemas.Conversation],
    operation_id="getAllConversations",
)
def get_conversations(
    db: DatabaseSession = Depends(get_db), user: User = Depends(get_user)
):
    query = (
        select(models.Conversation)
        .where(models.Conversation.users.contains(user))
        .order_by(models.Conversation.last_updated.desc())
    )

    # Can throw an error -- deal with later
    conversations = db.execute(query).scalars().all()

    return conversations


@router.get(
    "/{conversation_id}",
    response_model=schemas.Conversation,
    operation_id="getConversation",
)
def get_conversation(
    conversation_id: uuid.UUID,
    db: DatabaseSession = Depends(get_db),
    user: User = Depends(get_user),
):
    query = select(models.Conversation).where(
        models.Conversation.id == conversation_id,
        models.Conversation.users.contains(user),
    )

    conversation = db.execute(query).scalars().one()

    return conversation


# TODO
# Creating messages
# Creating Conversations

# Route to seed db for testing


@router.post("/seed", operation_id="seedConversations", status_code=201)
def seed_dummy_data(response: Response, db: DatabaseSession = Depends(get_db)):
    # Create Users
    user1 = User(
        email="alice@example.com",
        display_name="Alice",
        location="Wonderland",
        bio="Explorer of the unreal",
        profile_picture=None,
    )
    user2 = User(
        email="bob@example.com",
        display_name="Bob",
        location="Builderland",
        bio="Can we fix it? Yes, we can!",
        profile_picture=None,
    )

    db.add_all([user1, user2])
    db.flush()
    db.refresh(user1)
    db.refresh(user2)

    conversation = models.Conversation(users=[user1, user2])

    db.add(conversation)
    db.flush()
    db.refresh(conversation)

    # Create Messages
    message1 = models.Message(
        sender_id=user1.id,
        conversation_id=conversation.id,
        content="Hey Bob, how’s it going?",
        user=user1,
        conversation=conversation,
        created_at=datetime.now(),
    )

    message2 = models.Message(
        sender_id=user2.id,
        conversation_id=conversation.id,
        content="Good Alice! Building stuff as usual.",
        user=user2,
        conversation=conversation,
        created_at=datetime.now(),
    )

    db.add_all([message1, message2])
    db.flush()
    db.refresh(message2)  # Use the second message as newest

    # Update conversation with actual newest message ID
    # conversation.newest_message_id = message2.id
    conversation.last_updated = message2.created_at

    db.add(conversation)
    db.flush()

    # Create session for testing endpoints
    session = Session(session_token=secrets.token_urlsafe(32), user_id=user1.id)

    db.add(session)

    response.set_cookie(
        key="token", value=session.session_token, httponly=True, samesite="strict"
    )

    return {"message": "Dummy data seeded successfully"}
