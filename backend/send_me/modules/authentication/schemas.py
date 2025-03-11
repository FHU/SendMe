from send_me.schemas import SendMeModel


class LoginRequest(SendMeModel):
    email: str


class LoginResponse(SendMeModel):
    token: str


class SessionRequest(SendMeModel):
    pin: str
    login_token: str


class SessionResponse(SendMeModel):
    session_token: str
