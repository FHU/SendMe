import uuid

from sqlalchemy.orm import Mapped, mapped_column

from send_me.database.models import Base

"""
This class creates a many-to-many relationship for
opportunities and tags in the database in a normalized way.
SQLAlchemy uses this to write the appropiate SQL
for various operations.
"""

class OpportunityTags(Base):
    __tablename__ = "opportunity_tags"

    opportunity_id: Mapped[uuid.UUID] = mapped_column(primary_key = True)
    tag_id: Mapped[int] = mapped_column(primary_key = True)
