import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from send_me.database.models import Base

"""
This class represents a Conversation in the database.
Conceptually, conversations contain the messages sent between users.
This implementation allows for group messaging
"""


class Conversation(Base):
    __tablename__ = "conversations"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    newest_message_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("messages.id")
    )
    last_updated: Mapped[datetime]
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=datetime.now
    )

class UserConversations(Base):
    __tablename__ = "user_conversations"

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id")
    )
    conversation_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("conversations.id")
    )
    read: Mapped[bool]
