from pydantic import EmailStr
from datetime import datetime
from uuid import UUID

from send_me.schemas import SendMeModel


class LoginChallengeRequest(SendMeModel):
    email: str


class LoginChallengeResponse(SendMeModel):
    login_challenge_token: str


class SessionRequest(SendMeModel):
    otp: str


class SessionResponse(SendMeModel):
    session_token: str


class UserInfo(SendMeModel):
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

    created_at: datetime
