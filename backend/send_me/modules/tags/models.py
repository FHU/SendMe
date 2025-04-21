from sqlalchemy import Column, ForeignKey, Table

from send_me.database.models import Base

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


OpportunityTags = Table(
    "opportunity_tags",
    Base.metadata,
    Column("opportunity_id", ForeignKey("opportunities.id"), primary_key=True),
    Column("tag_id", ForeignKey("tags.id"), primary_key=True),
)
