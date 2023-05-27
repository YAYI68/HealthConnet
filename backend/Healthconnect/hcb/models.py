from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            email=self.normalize_email(email),
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


User_Roles = (
    ('PATIENT','PATIENT'),
    ('DOCTOR','DOCTOR'),
)
User_Gender = (
    ('MALE','MALE'),
    ('FEMALE','FEMALE'),
)

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    role= models.CharField(max_length=30,choices=User_Roles)
    country = models.CharField(max_length=20,null=True, blank=True)
    state=models.CharField(max_length=20,null=True, blank=True)
    image= models.ImageField(upload_to='users', null=True,blank=True,default='default.jpg')
    phone_number = models.CharField(max_length=20 , blank=True,null=True)
    gender = models.CharField(max_length=10, choices=User_Gender,null=True,blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    objects = UserManager()
    
    @property
    def fullname(self):
        return f'{self.first_name} {self.last_name}'
              
    def __str__(self):
        return self.email
    def has_perm(self, perm: str, obj: None = None) -> bool:
        return super().has_perm(perm, obj)
    
    def has_module_perms(self, app_label: str) -> bool:
        return super().has_module_perms(app_label)

Patient_MaritalStatus = (
    ('SINGLE', 'SINGLE'),
    ('MARRIED', 'MARRIED'),
    ('DIVORCED', 'DIVORCED'),
)

class Patient (models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)
    user=models.OneToOneField(User, on_delete=models.CASCADE,related_name='patient')
    blood_group=models.CharField(max_length=30,null=True,blank=True)
    genotype=models.CharField(max_length=30,null=True,blank=True)
    weight=models.FloatField(null=True,blank=True)
    age=models.IntegerField(null=True, blank=True)
    marital_status=models.CharField(max_length=20, choices=Patient_MaritalStatus, null=True, blank=True)
    medical_history=models.TextField(blank=True, null=True)
    
    def appointments(self,status=None):
        if status != None:  
            appointment = self.patient_appointment.filter(status=status)
            return appointment
        else:
            appointment = self.patient_appointment.all()
            return appointment
        
    def isPatientComplete(self):
        if((self.blood_group is None) &(self.genotype is None) & 
           (self.weight is None) & (self.age is None) ):
            return False
        return True
        
    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'
    
    
class Specialization(models.Model):
    name = models.CharField(max_length=20)
    
    def __str__(self):
        return self.name

class Doctor(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)
    user= models.OneToOneField(User, on_delete=models.CASCADE,related_name='doctor')
    hospital=models.CharField(max_length=50,null=True,blank=True)
    experience=models.IntegerField(null=True,blank=True)
    field = models.CharField( max_length=50, null=True,blank=True)
    bio = models.CharField(max_length=50, null=True, blank=True)
    qualification = models.CharField(max_length=50, null=True,blank=True)
    location = models.CharField(max_length=50, null=True,blank=True)
    
    
    def appointments(self,status=None):
        if status != None:  
            appointment = self.doctor_appointment.filter(status=status).order_by('date')
            return appointment
        else:
            appointment = self.doctor_appointment.all().order_by('date')
            return appointment
        
    @property    
    def reviews(self):
        reviews=self.doctor_reviews.all()
        return reviews
        
    
    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'
    

AppointmentStatus = (
    ('PENDING', 'PENDING'),
    ('DONE', 'DONE'),
    ('CANCELLED', 'CANCELLED'),
)
    
class Appointment(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL,null=True,related_name='doctor_appointment')
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL,null=True,related_name='patient_appointment')
    status = models.CharField(max_length=10,choices=AppointmentStatus, default='PENDING', null=True, blank=True)
    date = models.CharField(max_length=20, blank=True,null=True)
    time = models.CharField(max_length=10, blank=True,null=True)
    
    
    def __str__(self) -> str:
        return f'{self.id}'
    
class Review(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True,primary_key=True, editable=False)
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL,null=True,related_name='doctor_reviews')
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL,null=True,related_name='patient_reviews')
    content = models.TextField(blank=True, null=True)
    date = models.DateField(auto_now=True)
    
    def __str__(self):
        return f'{self.date} {self.doctor.user.first_name}'
    
    
class Blog(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True,primary_key=True, editable=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='blog', null=True,blank=True,default='default.jpg')
    title = models.CharField(max_length=150)
    content = models.TextField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    
    def __str__(self):
        return f'{self.title}'
    
    