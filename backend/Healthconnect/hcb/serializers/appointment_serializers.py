
from rest_framework import serializers
from .models import Appointment
from .patient_serializers import ShortPatientProfileSerializer
from .doctor_serializers import ShortDoctorProfileSerializer



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