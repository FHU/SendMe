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
    email: str
    display_name: str
