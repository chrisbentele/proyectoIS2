from django.core.mail import send_mail
import os


def send_email(subject, message, to_email):
    """Send email to the specified email address.

    Args:
        subject (str): The subject of the email.
        message (str): The message of the email.
        to_email (str): The email address to send the email to.
    """
    from_email = os.environ.get("EMAIL_HOST_USER")
    print(from_email)
    if subject and message and from_email:
        try:
            send_mail(subject, message, from_email, [to_email])
            return True
        except Exception as e:
            return e
    else:
        return False
