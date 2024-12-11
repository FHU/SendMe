import uuid
from datetime import datetime

from sqlalchemy import DateTime, Mapped, mapped_column

from cross_paths.database.models import Base

"""
This class represents an Opportunity in the database.
SQLAlchemy uses this to write the appropiate SQL
for various operations.
"""


class Opportunity(Base):
    __tablename__ = "opportunities"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True)
    name: Mapped[str]
    description: Mapped[str]

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=datetime.now
    )
