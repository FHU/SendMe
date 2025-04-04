import uuid
from datetime import datetime

from sqlalchemy import DateTime
from sqlalchemy.orm import Mapped, mapped_column

from send_me.database.models import Base

"""
This class represents a Message in the database.
SQLAlchemy uses this to write the appropiate SQL
for various operations.
"""


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    isUser: Mapped[bool]
    text: Mapped[str]
    conversation_id: Mapped[uuid.UUID]
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=datetime.now
    )
