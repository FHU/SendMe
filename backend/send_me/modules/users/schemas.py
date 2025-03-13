from datetime import datetime
from uuid import UUID

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
    email: str
    organization_id: UUID
    first_name: str
    last_name: str
    location: str


# This is the general definition of what an Organization looks like.
class User(SendMeModel):
    id: UUID
    email: str
    first_name: str
    last_name: str
    position: str
    location: str
    bio: str
    profile_picture: str
    linkedin: str
    facebook: str
    created_at: datetime
