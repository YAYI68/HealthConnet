
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from hcb.serializers.appointment_serializers import AppointmentSerializer
from hcb.serializers.patient_serializers  import PatientOverviewSerializer
from hcb.serializers.doctor_serializers import DoctorOverviewSerializer

from hcb.models import Appointment, Doctor




class AppointmentView(generics.CreateAPIView,generics.ListAPIView):
    serializer_class = AppointmentSerializer 
    permission_classes= [IsAuthenticated] 
    
    def get_object(self):
        user = self.request.user
        if user.role == 'PATIENT':
            return user.patient
        elif user.role == 'DOCTOR':
            return user.doctor
    
    def get_queryset(self):
        status = self.request.query_params.get('status')
        print('status', status)
        obj = self.get_object()
        if status != None:
            queryset=obj.appointments(status=status)
            return queryset
        else:
            queryset = obj.appointments()
            return queryset
    
    
    def post(self, request):
        user = request.user
        patient = user.patient
        data = request.data      
        doctor = Doctor.objects.get(user__id=request.data['doctor_id'])
        if doctor is not None :
            appointment = Appointment.objects.create(
                patient=patient,
                doctor=doctor,
                time=request.data.get('time',None),
                date=request.data.get('date',None),
            )
            serializer = self.get_serializer(appointment,many=False)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        
class AppointmentPutDetailVeiw(generics.UpdateAPIView,generics.RetrieveAPIView):
    serializer_class = AppointmentSerializer
    permission_classes= [IsAuthenticated]
    
    def get_object(self):
        id = self.kwargs['pk']
        appointment = Appointment.objects.get(pk=id)
        return appointment
    
class AppointmentOverviewView(generics.RetrieveAPIView):
    serializer_class = PatientOverviewSerializer
    
    def get_object(self):
        user = self.request.user
        if user.role == 'PATIENT':
            return user.patient
        elif user.role == 'DOCTOR':
            return user.doctor
        
    def get_serializer_class(self):
           user = self.request.user
           if user.role == 'PATIENT':
               return PatientOverviewSerializer
           elif user.role == 'DOCTOR':
               return DoctorOverviewSerializer
     