import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship, ForeignKey

from send_me.database.models import Base
from send_me.modules.authentication.models import Session


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(unique=True)
    organization_id: Mapped[str] = mapped_column(ForeignKey("Organizations.id"))
    first_name: Mapped[str]
    last_name: Mapped[str]
    position: Mapped[str]
    location: Mapped[str]
    bio: Mapped[str]
    profile_picture: Mapped[str]
    linkedin: Mapped[Optional[str]] = mapped_column(unique = True)
    facebook: Mapped[Optional[str]] = mapped_column(unique = True)
    session: Mapped[Optional[Session]] = relationship(
        "Session", uselist=False, back_populates="user", cascade="all, delete-orphan"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=datetime.now
    )
