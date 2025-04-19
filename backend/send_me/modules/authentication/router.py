import secrets
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from fastapi.responses import RedirectResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from send_me.database.engine import get_db
from send_me.modules.users.models import User

from . import models, schemas, utils
from .dependencies import get_user
from .exceptions import SendOTPFailure

TEN_MINUTES_OLD = timedelta(minutes=10)

router = APIRouter(
    prefix="/auth",
    tags=["authentication"],
    responses={404: {"description": "Not Found"}},
)


@router.post("/start-challenge", operation_id="request_otp")
def request_otp(
    input: schemas.LoginChallengeRequest,
    response: Response,
    db: Session = Depends(get_db),
):
    # Check if user exists
    user_query = select(User).where(User.email == input.email)

    user = db.execute(user_query).scalar()

    if not user:
        return RedirectResponse(url="/profiles/sign-up")

    # Create a login
    login_challenge = models.LoginChallenge(
        code=str(secrets.randbelow(1_000_000)),
        login_challenge_token=str(secrets.token_urlsafe(16)),
        email=input.email,
    )

    try:
        utils.send_otp(login_challenge.email, login_challenge.code)
    except SendOTPFailure as e:
        raise HTTPException(
            status_code=500, detail=f"Error when sending email: {str(e)}"
        ) from e

    db.add(
        models.LoginChallenge(
            code=login_challenge.code,
            login_challenge_token=login_challenge.login_challenge_token,
            email=login_challenge.email,
        )
    )

    response.set_cookie(
        key="challenge_session",
        value=login_challenge.login_challenge_token,
        httponly=True,
        samesite="strict",
    )


@router.post("/challenge", operation_id="enter_otp")
def challenge_otp(
    input: schemas.SessionRequest,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
):
    token = request.cookies.get("challenge_session")
    # Check if otp and token are in db
    login_query = select(models.LoginChallenge).where(
        models.LoginChallenge.login_challenge_token == token,
        models.LoginChallenge.code == input.otp,
    )

    login = db.execute(login_query).scalar()

    if not login:
        raise HTTPException(status_code=404, detail="Login not found")

    login_age = login.created_at - datetime.now(timezone.utc)

    if login_age > TEN_MINUTES_OLD:
        raise HTTPException(status_code=403, detail="TOKEN EXPIRED")

    # Create Session

    # Get user to create session
    user_query = select(User).where(User.email == login.email)
    user = db.execute(user_query).scalar()

    # The user should exist but just in case...
    if not user:
        raise HTTPException(status_code=404, detail="Unable to find user")

    # Check if a session already exists for the user
    session_query = select(models.Session).where(models.Session.user_id == user.id)
    session = db.execute(session_query).scalar_one_or_none()

    if session:
        session.created_at = datetime.now(timezone.utc)
    else:
        session = models.Session(session_token=secrets.token_urlsafe(32), user_id=user.id)

        db.add(session)

    db.delete(login)

    response.set_cookie(
        key="token", value=session.session_token, httponly=True, samesite="strict"
    )


@router.get("/me", response_model=schemas.UserInfo, operation_id="get_me")
def current_user(
    me: User = Depends(get_user),
):
    return me
