from django.contrib import admin
from .models import User,Doctor,Patient,Specialization,Review
# Register your models here.
admin.site.register(User)
admin.site.register(Doctor)
admin.site.register(Patient)
admin.site.register(Specialization)
admin.site.register(Review)