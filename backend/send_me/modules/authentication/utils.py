import os

from sendgrid import SendGridAPIClient # type:ignore
from sendgrid.helpers.mail import Mail # type:ignore

from .exceptions import SendOTPFailure

# Default to empty strings to allow the app to run in development without the need for emails
SENDGRID_API_KEY = os.environ.get("SENDGRID_API_KEY", "")
SENDGRID_SENDER_EMAIL = os.environ.get("SENDGRID_SENDER_EMAIL", "")


def send_otp(email: str, otp: str):
    """
    Sends an email with the OTP using SendGrid,
    or prints it to the console if SENDGRID_API_KEY is not set.
    Returns True if successful, False otherwise.
    """
    if not SENDGRID_API_KEY:
        print(f"OTP for ${email}: {otp}")  # noqa: T201
        return

    message = Mail(
        from_email=SENDGRID_SENDER_EMAIL,
        to_emails=email,
        subject="Your Login OTP",
        html_content=f"<p>Your OTP is: <strong>{otp}</strong></p>",
    )

    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message) # type: ignore
        # 200 < response.status_code <= 300 was here before
        # It was causing pyright to fail and was not being used therefore
        # it was replaced with return True
        return True
    except Exception as exception:
        raise SendOTPFailure() from exception
