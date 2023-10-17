from .models import User, Doctor, Patient
from django.db.models.signals import post_save, post_delete


# def createProfile(sender, instance, created, **kwargs):
#     if created:
#         user = instance
#         if user.role == 'PATIENT':
#             Patient.objects.create(user=user)
#         if user.role == 'DOCTOR':
#             Doctor.objects.create(user=user)

# post_save.connect(createProfile, sender=User)
