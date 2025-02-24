import os

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# This method was chosen so the app would crash if no key was present
SENDGRID_API_KEY = os.environ["SENDGRID_API_KEY"]
SENDGRID_SENDER_EMAIL = os.environ["SENDGRID_SENDER_EMAIL"]


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
        response = sg.send(message)
        return 200 <= response.status_code < 300
    except Exception:
        return False
