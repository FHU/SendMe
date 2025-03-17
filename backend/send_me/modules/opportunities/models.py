import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from send_me.database.models import Base

"""
This class represents an Opportunity in the database.
SQLAlchemy uses this to write the appropiate SQL
for various operations.
"""


class Opportunity(Base):
    __tablename__ = "opportunities"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    name: Mapped[str]
    description: Mapped[str]
    location: Mapped[str]
    short_description: Mapped[str]
    organization_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("Organizations.id"))
    event_date: Mapped[datetime | None]
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=datetime.now
    )

