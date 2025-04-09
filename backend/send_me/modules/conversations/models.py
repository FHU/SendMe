import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from send_me.database.models import Base
from send_me.modules.users.models import User

"""
This class represents a Conversation in the database.
Conceptually, conversations contain the messages sent between users.
This implementation allows for group messaging
"""


class Conversation(Base):
    __tablename__ = "conversations"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    newest_message_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("messages.id"), nullable=True
    )
    last_updated: Mapped[datetime]
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=datetime.now
    )

    newest_message = relationship("Message", back_populates="conversation")
    users = relationship("UserConversations", back_populates="conversation")


class UserConversations(Base):
    __tablename__ = "user_conversations"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    conversation_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("conversations.id"))
    read: Mapped[bool] = mapped_column(default=False)

    user = relationship("User", back_populates="conversations")


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    sender_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    conversation_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("conversations.id"))
    content: Mapped[str]

    sender = relationship(User, back_populates="mesages")
    conversation = relationship(Conversation, back_populates="messages")

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=datetime.now
    )
