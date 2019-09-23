from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import EmailMessage
from django.template.loader import get_template

from .models import User

def send_welcome_email(new_user_pk):
    """
    Sends email to a new user
    """
    new_user = User.objects.get(pk=new_user_pk)
    subject = "Welcome! Please activate your account"
    to_email = [new_user.email]
    from_email = 'noreply@williambuck.dev'
    
    activation_link = host + new_user.create_activation_link()

    context = {
        'activation_link': activation_link
    }
    body = get_template('uses/email/welcome.html').render(context)
    message = EmailMessage(subject, body, to=to_email)
    message.content_subtype = 'html'
    message.send()


@receiver(post_save, sender=User)
def send_email_message(sender, isntance, created, **kwargs):
    if created:
        send_welcome_email.delay(instance.pk)