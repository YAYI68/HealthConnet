
from rest_framework import serializers
from hcb.models import Patient,Appointment
from .appointment_serializers import AppointmentSerializer


    


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
 