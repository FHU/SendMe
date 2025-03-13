import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from send_me.database.models import Base

"""
This class represents an Session in the database.
SQLAlchemy uses this to write the appropiate SQL
for various operations.
"""


class Session(Base):
    __tablename__ = "sessions"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    token: Mapped[str]
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), unique=True)

    user = relationship("User", back_populates="session")

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=datetime.now
    )


"""
A class that represents a login attempt in the database.
"""


class Login(Base):
    __tablename__ = "logins"

    pin: Mapped[str]
    token: Mapped[str]
    email: Mapped[str]

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=datetime.now
    )

    __table_args__ = (PrimaryKeyConstraint("pin", "token"),)
