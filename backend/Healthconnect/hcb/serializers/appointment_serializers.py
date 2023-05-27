
from rest_framework import serializers
# from .patient_serializers import ShortPatientProfileSerializer
# from .doctor_serializers import ShortDoctorProfileSerializer
from hcb.models import Appointment,Doctor,Patient





class PatientAppointmentProfileSerializer(serializers.ModelSerializer):
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
    



class DoctorAppointmentProfileSerializer(serializers.ModelSerializer):
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
    



class AppointmentSerializer(serializers.ModelSerializer):
    patient = serializers.SerializerMethodField(read_only=True)
    doctor = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Appointment
        fields = ['id','patient','doctor','status','date','time','fee']
        
    def get_patient(self,obj):
        patient = obj.patient
        serializer = PatientAppointmentProfileSerializer(patient,many=False)
        return serializer.data
    
    def get_doctor(self,obj):
       doctor = obj.doctor
       serializer = DoctorAppointmentProfileSerializer(doctor,many=False)
       return serializer.data