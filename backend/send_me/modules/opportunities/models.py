import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from send_me.database.models import Base

from sqlalchemy import ARRAY, String

"""
This class represents an Opportunity in the database.
SQLAlchemy uses this to write the appropiate SQL
for various operations.
"""


class Opportunity(Base):
    __tablename__ = "opportunities"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    title: Mapped[str | None]
    contact_user: Mapped[str]
    description: Mapped[str]
    summary: Mapped[str | None]
    location: Mapped[str | None]
    organization_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("organizations.id")
    )
    tags: Mapped[list[str] | None] = mapped_column(ARRAY(String))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=datetime.now
    )