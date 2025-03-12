from typing import Optional

from send_me.schemas import SendMeModel


class LoginRequest(SendMeModel):
    email: str


class LoginResponse(SendMeModel):
    login_token: str
    pin: Optional[str] = None


class SessionRequest(SendMeModel):
    pin: str
    login_token: str


class SessionResponse(SendMeModel):
    session_token: str
