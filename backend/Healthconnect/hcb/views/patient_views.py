from rest_framework import exceptions as rest_exceptions
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status, generics
from rest_framework.response import Response
from hcb.models import Patient, User

from hcb.serializers.patient_serializers import (
    PatientProfileSerializer
)


class CreatePatient(generics.CreateAPIView):
    serializer_class = PatientProfileSerializer

    def post(self, request):
        data = request.data
        try:
            user = User.objects.get(id=data.get('userId'))
            user.country = data.get('country')
            user.state = data.get('state')
            user.gender = data.get('gender')
            user.image = data.get('image', user.image)
            user.is_complete = True
            user.save()
            patient = Patient.objects.create(user=user,
                                             blood_group=data.get(
                                                 'blood_group'),
                                             genotype=data.get('genotype'),
                                             weight=data.get('weight'),
                                             age=data.get('age'),
                                             marital_status=data.get(
                                                 'marital_status'),
                                             medical_history=data.get(
                                                 'medical_history')
                                             )
            serializer = PatientProfileSerializer(patient, many=False)
            return Response({"message": "Profile created successfully"}, status=status.HTTP_201_CREATED)
        except:
            return Response({"message": "Invalid Data Input, Kindly enter appropriate information"}, status=status.HTTP_400_BAD_REQUEST)


class GetUpdateDeletePatientProfileView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PatientProfileSerializer

    def get_object(self):
        try:
            user = self.request.user
            return user.patient
        except:
            raise rest_exceptions.AuthenticationFailed(
                'User is not authorized '
            )

    def get_serializer_context(self):
        context = super(GetUpdateDeletePatientProfileView,
                        self).get_serializer_context()
        context.update({"user": self.request.user})
        return context

    def delete(self, request):
        user = self.request.user
        user.delete()
        return Response({'message': 'User sucessfully deleted'}, status.HTTP_204_NO_CONTENT)
