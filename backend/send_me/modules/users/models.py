import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from send_me.database.models import Base
from send_me.modules.authentication.models import Session


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(unique=True)
    organization_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("organizations.id")
    )
    first_name: Mapped[str]
    last_name: Mapped[str]
    location: Mapped[str]
    bio: Mapped[str | None]
    profile_picture: Mapped[str | None]
    facebook: Mapped[str | None]
    x: Mapped[str | None]
    instagram: Mapped[str | None]
    linkedin: Mapped[str | None]

    session: Mapped[Optional[list[Session]]] = relationship(
        "Session", uselist=False, back_populates="user", cascade="all, delete-orphan"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=datetime.now
    )
