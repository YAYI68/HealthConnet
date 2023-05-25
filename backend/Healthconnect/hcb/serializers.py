import django.db
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User,Patient,Doctor,Appointment,Review,Blog


class UserSerializerToken(serializers.ModelSerializer):
    slug = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ('id','role','email','slug')
        
    def get_slug(self,obj):
        slug = f'{obj.first_name}-{obj.last_name}'
        return slug


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    class Meta:
        fields = ('role','email','password')
        model = User
        
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["role"] = user.role

        return token

    # def validate(self, attrs):
    #     data = super().validate(attrs)

    #     serializer = UserSerializerToken(self.user).data
    #     for k, v in serializer.items():
    #         data[k] = v
    #     return data

class UserSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password','role')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        if user.role == 'Doctor':
            user.is_staff = True
            user.save()
            return user
        return user


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password','role')
        extra_kwargs = {'password': {'write_only': True}}
        

class UserProfileSeriliazer(serializers.ModelSerializer):
    firstname  = serializers.CharField(source='first_name')
    lastname = serializers.CharField(source='last_name')
   
    class Meta:
        model=User
        fields=('id','image','role','email','firstname','lastname','phone_number','gender','state','country')  
        
    def to_representation(self,instance):
        data = super().to_representation(instance)
        user = instance
        if user.role == 'PATIENT':
            data['total_pending_appointment'] = user.patient.total_appointments(status='PENDING')
        elif user.role=='DOCTOR':
            data['total_pending_appointment'] = user.doctor.total_appointments(status='PENDING')
        return data
       
            
            
            
class ReviewSerializer(serializers.ModelSerializer):
    name = serializers.CharField(read_only=True,source='patient.user.fullname')
    image = serializers.ImageField(read_only=True,source='patient.user.image')
    
    
    class Meta:
        model = Review
        fields = ('id','content','name','image','date')       
             

    
class PatientProfileSerializer(serializers.ModelSerializer):
    uid = serializers.CharField(read_only=True,source='user.id')
    image = serializers.ImageField(source='user.image')
    email = serializers.EmailField(read_only=True,source='user.email')
    firstname  = serializers.CharField(source='user.first_name')
    lastname = serializers.CharField(source='user.last_name')
    phonenumber = serializers.CharField(source='user.phone_number')
    gender = serializers.CharField(source='user.gender')
    state = serializers.CharField(source='user.state') 
    country = serializers.CharField(source='user.country')   
    class Meta:
        model=Patient
        fields=('uid','image','email','firstname','lastname','phonenumber','gender','state','country','blood_group','age','weight','genotype','marital_status','medical_history')
        
    def update(self,instance,validated_data):
        user_data = validated_data.get('user',None)
        user = instance.user
        if user_data is not None:
            user.first_name = user_data.get('first_name',user.first_name)
            user.image = user_data.get('image',user.image)
            user.last_name = user_data.get('last_name',user.last_name)
            user.phone_number = user_data.get('phone_number',user.phone_number)
            user.gender = user_data.get('gender',user.gender)
            user.state = user_data.get('state',user.state)
            user.country = user_data.get('country',user.country)
            user.save()
        instance.blood_group = validated_data.get('blood_group',instance.blood_group)
        instance.age = validated_data.get('age',instance.age)
        instance.weight = validated_data.get('weight',instance.weight)
        instance.genotype = validated_data.get('genotype',instance.genotype)
        instance.marital_status = validated_data.get('marital_status',instance.marital_status)
        instance.medical_history = validated_data.get('medical_history',instance.medical_history)
        instance.save()
        return instance
             
class DoctorProfileSerializer(serializers.ModelSerializer):
    uid = serializers.CharField(read_only=True,source='user.id')
    image = serializers.ImageField(source='user.image')
    email = serializers.EmailField(read_only=True,source='user.email')
    firstname  = serializers.CharField(source='user.first_name')
    lastname = serializers.CharField(source='user.last_name')
    phonenumber = serializers.CharField(source='user.phone_number')
    gender = serializers.CharField(source='user.gender')
    state = serializers.CharField(source='user.state') 
    country = serializers.CharField(source='user.country')  
    reviews = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Doctor
        fields=('uid','image','email','firstname','lastname','phonenumber','gender','state','country','hospital','experience','field','bio','qualification','location','reviews')

    def get_reviews(self,obj):
        reviews = obj.reviews
        serializer = ReviewSerializer(reviews,many=True)
        return serializer.data
        
    
    def update(self,instance,validated_data):
        user_data = validated_data.get('user',None)
        user = instance.user
        if user_data is not None:
            user.first_name = user_data.get('first_name',user.first_name)
            user.image = user_data.get('image',user.image)
            user.last_name = user_data.get('last_name',user.last_name)
            user.phone_number = user_data.get('phone_number',user.phone_number)
            user.gender = user_data.get('gender',user.gender)
            user.state = user_data.get('state',user.state)
            user.country = user_data.get('country',user.country)
            user.save()
        instance.hospital = validated_data.get('hospital',instance.hospital) 
        instance.experience = validated_data.get('experience',instance.experience)  
        instance.field = validated_data.get('field',instance.field) 
        instance.bio = validated_data.get('bio',instance.bio) 
        instance.qualification = validated_data.get('qualification',instance.qualification) 
        instance.location = validated_data.get('location',instance.location) 
        instance.save()
        return instance   
    
class ShortDoctorProfileSerializer(serializers.ModelSerializer):
    uid = serializers.CharField(read_only=True,source='user.id')
    image = serializers.ImageField(source='user.image')
    fullname  = serializers.SerializerMethodField(read_only=True)
    service = serializers.CharField(source='field')
    
    class Meta:
        model=Doctor
        fields=('uid','fullname','image','service')
        
    def get_fullname(self,obj):
        firstname = obj.user.first_name
        lastname = obj.user.last_name
        return f'{firstname} {lastname}'
        
class ShortPatientProfileSerializer(serializers.ModelSerializer):
    uid = serializers.CharField(read_only=True,source='user.id')
    image = serializers.ImageField(source='user.image')
    fullname  = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model=Patient
        fields=('uid','fullname', 'image')
        
    def get_fullname(self,obj):
        firstname = obj.user.first_name
        lastname = obj.user.last_name
        return f'{firstname} {lastname}'
 
    
class AppointmentSerializer(serializers.ModelSerializer):
    patient = serializers.SerializerMethodField(read_only=True)
    doctor = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Appointment
        fields = ['id','patient','doctor','status','date','time']
        
    def get_patient(self,obj):
        patient = obj.patient
        serializer = ShortPatientProfileSerializer(patient,many=False)
        return serializer.data
    
    def get_doctor(self,obj):
       doctor = obj.doctor
       serializer = ShortDoctorProfileSerializer(doctor,many=False)
       return serializer.data
   
        
    
    
        
class PatientOverviewSerializer(serializers.Serializer):
    appointment = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        models = Patient
        fields=['appointment']
        
    def get_appointment(self,obj):
        patient = obj
        appointments = Appointment.objects.filter(patient=patient)
        serializer = AppointmentSerializer(appointments,many=True)
        return serializer.data
    
    def to_representation(self,instance):
        patient = instance
        data = super().to_representation(instance)
        data['total_booking'] = patient.appointments().count()
        data['total_success'] = patient.appointments(status='PENDING').count()
        data['total_cancelled'] = patient.appointments(status='CANCELLED').count()
        return data
    
class DoctorOverviewSerializer(serializers.Serializer):
    appointment = serializers.SerializerMethodField(read_only=True)
    slug = serializers
    
    class Meta:
        models = Doctor
        fields=['appointment']
        
    def get_appointment(self,obj):
        doctor = obj.doctor
        appointments = Appointment.objects.filter(doctor=doctor)
        serializer = AppointmentSerializer(appointments,many=True)
        return serializer.data
    
    def to_representation(self,instance):
        doctor = instance
        data = super().to_representation(instance)
        data['total_booking'] = doctor.appointments().count()
        data['total_success'] = doctor.appointments(status='DONE').count()
        data['total_cancelled'] = doctor.appointments(status='CANCELLED').count()
        return data
    

class BlogSerializer(serializers.ModelSerializer):
    excerpt = serializers.SerializerMethodField(read_only=True)
    date  = serializers.CharField(read_only=True,source='created_at')
    slug = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Blog
        fields = ('id','author','image','title','slug','excerpt','content','date','updated_at')
        
    def get_excerpt(self,obj):
        content = obj.content
        word = content[:100]
        return word

    def get_slug(self,obj):
        title = obj.title
        slug = title.replace(" ","-")
        return slug

    
  
        
    
 