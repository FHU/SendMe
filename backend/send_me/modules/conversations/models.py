import uuid
from datetime import datetime

from sqlalchemy import DateTime
from sqlalchemy.orm import Mapped, mapped_column

from send_me.database.models import Base

"""
This class represents a Conversation in the database.
SQLAlchemy uses this to write the appropiate SQL
for various operations.
"""


class Conversation(Base):
    __tablename__ = "conversations"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    user: Mapped[str]
    last_updated: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=datetime.now
    )
    most_recent: Mapped[str]
    is_read: Mapped[bool]
