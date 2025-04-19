import uuid
from datetime import datetime
from typing import List, Optional

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Table
from sqlalchemy.orm import Mapped, mapped_column, relationship

from send_me.database.models import Base

"""
This class represents a Conversation in the database.
Conceptually, conversations contain the messages sent between users.
This implementation allows for group messaging
"""

# This is the way that this is done in the docs.
UserConversations = Table(
    "user_conversations",
    Base.metadata,
    # These type ignores were added to suppress pyright lint errors. I cant figure out a way to add types.
    Column("user_id", ForeignKey("users.id"), primary_key=True), # type: ignore
    Column("conversation_id", ForeignKey("conversations.id"), primary_key=True), # type: ignore
    Column("read", Boolean, default=False),
)


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    sender_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    conversation_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("conversations.id"))
    content: Mapped[str]

    sender = relationship("User", back_populates="messages")
    conversation = relationship(
        "Conversation", back_populates="messages", foreign_keys=[conversation_id]
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=datetime.now
    )


class Conversation(Base):
    __tablename__ = "conversations"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    last_updated: Mapped[datetime] = mapped_column(default=datetime.now)

    users = relationship(
        "User", secondary=UserConversations, back_populates="conversations"
    )

    messages: Mapped[Optional[List[Message]]] = relationship(
        cascade="all, delete-orphan"
    )
