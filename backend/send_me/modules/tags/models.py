import uuid

from sqlalchemy import ForeignKey, Mapped, mapped_column
from sqlalchemy.orm import relationship

from send_me.database.models import Base
from send_me.modules.opportunities.models import Opportunity

"""
This class creates a many-to-many relationship for
opportunities and tags in the database in a normalized way.
SQLAlchemy uses this to write the appropiate SQL
for various operations.
"""


# class Tags(Base):
#     __table_name__ = "tags"

#     id: Mapped[uuid.UUID] = mapped_column(primary_key=True)
#     name: Mapped[str]


class OpportunityTags(Base):
    __table_name__ = "opportunity_tags",
    opportunity_id:  Mapped[uuid.UUID] = mapped_column(ForeignKey("opportunities.id"), primary_key=True)
    opportunity: Mapped[Opportunity]= relationship(back_populates = "opportunities")
    tag_id: Mapped[int] = mapped_column(ForeignKey("tags.id"), primary_key=True),
