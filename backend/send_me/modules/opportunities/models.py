import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from send_me.database.models import Base
from send_me.modules.tags.models import OpportunityTags

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
    location: Mapped[str | None]
    short_description: Mapped[str | None]
    organization_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("organizations.id")
    )
    event_date: Mapped[datetime | None]
    tags = relationship("OpportunityTags", secondary=OpportunityTags, back_populates="opportunity_tags")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=datetime.now
    )
