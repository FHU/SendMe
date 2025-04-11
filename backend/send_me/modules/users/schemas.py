from datetime import datetime
from uuid import UUID

from pydantic import EmailStr

from send_me.schemas import SendMeModel

"""
Unlike models, these are not used for database access.
Instead, these provide a sort of strict data type that
is used by FastAPI. FastAPI will kindly provide clean
errors automatically with this, not to mention an
OpenAPI spec.
"""


# Specifies the client's request to create an user.
class CreateUserRequest(SendMeModel):
    email: EmailStr
    first_name: str
    last_name: str
    location: str
    bio: str | None = None
    profile_picture: str | None = None
    facebook: str | None = None
    x: str | None = None
    instagram: str | None = None
    linkedin: str | None = None


class GetProfileResponse(SendMeModel):
    id: UUID
    first_name: str
    last_name: str
    email: EmailStr


class User(SendMeModel):
    id: UUID
    email: EmailStr
    orginzation_id: UUID | None = None
    first_name: str
    last_name: str
    location: str
    bio: str | None = None
    profile_picture: str | None = None
    facebook: str | None = None
    x: str | None = None
    linkedin: str | None = None
    facebook: str | None = None
