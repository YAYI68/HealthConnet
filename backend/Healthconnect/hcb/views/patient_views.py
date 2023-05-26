from rest_framework import exceptions as rest_exceptions
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status, generics
from rest_framework.response import Response

from hcb.serializers.patient_serializers import (
    PatientOverviewSerializer,
    ShortPatientProfileSerializer,
    PatientProfileSerializer
)

class GetUpdateDeletePatientProfileView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class=PatientProfileSerializer
    
    def get_object(self):
        try:
            user = self.request.user
            return user.patient
        except :
            raise rest_exceptions.AuthenticationFailed(
            'User is not authorized '
            )
        
    def get_serializer_context(self):
        context = super(GetUpdateDeletePatientProfileView, self).get_serializer_context()
        context.update({"user": self.request.user})
        return context
        
    def delete(self,request):
        user = self.request.user
        user.delete()
        return Response({'message':'User sucessfully deleted'},status.HTTP_204_NO_CONTENT)