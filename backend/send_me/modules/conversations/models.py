import uuid
from datetime import datetime
from typing import Optional, List

from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from send_me.database.models import Base

"""
This class represents a Conversation in the database.
Conceptually, conversations contain the messages sent between users.
This implementation allows for group messaging
"""


class Conversation(Base):
    __tablename__ = "conversations"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    newest_message_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("messages.id"),
    )
    last_updated: Mapped[datetime | None]

    newest_message = relationship("messages", back_populates="conversation")
    users = relationship("user_conversations", back_populates="conversation")


class UserConversations(Base):
    __tablename__ = "user_conversations"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    conversation_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("conversations.id"))
    read: Mapped[bool] = mapped_column(default=False)

    user = relationship("users", back_populates="conversations")


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    sender_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    conversation_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("conversations.id"))
    content: Mapped[str]

    sender = relationship("users", back_populates="mesages")
    conversation = relationship("conversations", back_populates="messages")

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=datetime.now
    )
