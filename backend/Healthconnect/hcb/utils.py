import secrets
import string
from decouple import config
from django.core.mail import send_mail


def generate_random_code(length=5):
    # Define the characters to use for the random string
    characters = string.ascii_letters + string.digits

    # Generate the random code
    random_code = ''.join(secrets.choice(characters) for i in range(length))

    return random_code.upper()


def sendEmail(subject, recipient_list, html_message):
    from_email = config('EMAIL_HOST_USER')
    send_mail(subject=subject, message="", from_email=from_email,
              recipient_list=recipient_list, html_message=html_message)
