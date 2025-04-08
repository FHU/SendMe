from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from send_me.database.engine import get_db
from send_me.modules.conversations.models import Conversation, UserConversations
from send_me.modules.messages.models import Message
from send_me.modules.users.models import User

router = APIRouter(prefix="/seed", tags=["Seed Data"])


@router.post("/dummy")
def seed_dummy_data(db: Session = Depends(get_db)):
    # Clear existing data (optional)
    db.query(UserConversations).delete()
    db.query(Message).delete()
    db.query(Conversation).delete()
    db.query(User).delete()
    db.flush()

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

    conversation = Conversation(
        last_updated=datetime.now(),
    )
    db.add(conversation)
    db.flush()
    db.refresh(conversation)

    # Create Messages
    message1 = Message(
        sender=user1.id,
        content="Hey Bob, how’s it going?",
        conversation_id=conversation.id,
    )
    message2 = Message(
        sender=user2.id,
        content="Good Alice! Building stuff as usual.",
        conversation_id=conversation.id,
    )

    db.add_all([message1, message2])
    db.flush()
    db.refresh(message2)  # Use the second message as newest

    # Update conversation with actual newest message ID
    conversation.newest_message_id = message2.id
    conversation.last_updated = message2.created_at
    db.flush()

    # Link Users to Conversation
    db.add_all(
        [
            UserConversations(
                user_id=user1.id, conversation_id=conversation.id, read=False
            ),
            UserConversations(
                user_id=user2.id, conversation_id=conversation.id, read=True
            ),
        ]
    )
    db.flush()

    return {"message": "Dummy data seeded successfully"}
