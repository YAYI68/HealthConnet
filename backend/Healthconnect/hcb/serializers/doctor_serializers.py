
from rest_framework import serializers
from hcb.models import Doctor,Appointment
from .review_serializers import ReviewSerializer




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