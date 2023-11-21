from django.contrib import admin
from .models import User, Doctor, Patient, Specialization, Review, UserToken, Appointment
# Register your models here.
admin.site.register(User)
admin.site.register(Doctor)
admin.site.register(Patient)
admin.site.register(Specialization)
admin.site.register(Review)
admin.site.register(Appointment)
admin.site.register(UserToken)
