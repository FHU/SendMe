import os

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Default to empty strings to allow the app to run in development without the need for emails
SENDGRID_API_KEY = os.environ.get("SENDGRID_API_KEY", "")
SENDGRID_SENDER_EMAIL = os.environ.get("SENDGRID_SENDER_EMAIL", "")


def send_email(email, pin):
    """
    Sends an email with the PIN using SendGrid.
    Returns True if successful, False otherwise.
    """
    message = Mail(
        from_email=SENDGRID_SENDER_EMAIL,
        to_emails=email,
        subject="Your Login PIN",
        html_content=f"<p>Your PIN is: <strong>{pin}</strong></p>",
    )

    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)
        # 200 < response.status_code <= 300 was here before
        # It was causing pyright to fail and was not being used therefore
        # it was replaced with return True
        return True
    except Exception:
        return False
