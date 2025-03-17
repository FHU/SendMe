from typing import Optional

from send_me.schemas import SendMeModel


class LoginChallengeRequest(SendMeModel):
    email: str


class LoginChallengeResponse(SendMeModel):
    login_challenge_token: str
    code: Optional[str] = None


class SessionRequest(SendMeModel):
    code: str
    login_challenge_token: str


class SessionResponse(SendMeModel):
    session_token: str
