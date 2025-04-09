from datetime import datetime
import uuid

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from send_me.database.engine import get_db
from send_me.modules.authentication.dependencies import get_user
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
    response_model=schemas.GetConversationsResponse,
    operation_id="getAllConversations",
)
def get_conversations(db: Session = Depends(get_db), user: User = Depends(get_user)):
    query = (
        select(models.Conversation)
        .where(user in models.Conversation.users)
        .order_by(models.Conversation.last_updated.desc())
    )

    # Can throw an error -- deal with later
    conversations = db.execute(query).scalars().all()

    return conversations


# List messages in a conversation
@router.get(
    "/messages/{conversation_id}",
    response_model=schemas.GetMessagesResponse,
    operation_id="getMessagesInConversation",
)
def get_messages(
    conversation_id: uuid.UUID,
    db: Session = Depends(get_db),
    user: User = Depends(get_user),
):
    query = select(models.Message).where(
        models.Message.conversation_id == conversation_id,
        user in models.Message.conversation.users,
    )

    # This can cause errors. Deal with later
    messages = db.execute(query).scalars().all()

    return messages


# Creating messages
# Creating Conversations

# Route to seed db for testing


@router.post("/seed")
def seed_dummy_data(db: Session = Depends(get_db)):
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

    conversation = models.Conversation()

    db.add(conversation)
    db.flush()
    db.refresh(conversation)

    # Tie user to conversation

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

    return {"message": "Dummy data seeded successfully"}
