from django.db.models import Q

from rest_framework import exceptions as rest_exceptions
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


from hcb.models import Doctor

from hcb.serializers.doctor_serializers import (
    DoctorProfileSerializer
)


class CreateDoctor(generics.CreateAPIView):
    serializer_class = DoctorProfileSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data
        user.country = data.get('country')
        user.state = data.get('state')
        user.gender = data.get('gender')
        user.phone_number = data.get('phoneNumber')
        user.image = data.get('image')
        user.is_staff = True
        user.is_complete = True
        user.save()
        doctor = Doctor.objects.create(user=user,
                                       hospital=data.get('hospital'),
                                       experience=data.get('experience'),
                                       field=data.get('field'),
                                       bio=data.get('bio'),
                                       qualification=data.get(
                                           'qualification'),
                                       location=data.get('location'),
                                       price=data.get('price'),
                                       )
        serializer = DoctorProfileSerializer(doctor, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class GetUpdateDeleteDoctorProfileView(generics.UpdateAPIView, generics.DestroyAPIView, generics.RetrieveAPIView):
    serializer_class = DoctorProfileSerializer
    permission_classes = [IsAdminUser]

    def get_object(self):
        try:
            user = self.request.user
            return user.doctor
        except:
            raise ValueError('You can only updateDoctorProfile')

    def get_serializer_context(self):
        context = super(GetUpdateDeleteDoctorProfileView,
                        self).get_serializer_context()
        context.update({"user": self.request.user})
        return context

    def delete(self, request):
        user = self.request.user
        user.delete()
        return Response({'message': 'User sucessfully deleted'}, status.HTTP_204_NO_CONTENT)


class GetAllDoctors(generics.ListAPIView):
    serializer_class = DoctorProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Doctor.objects.all()
        query = self.request.query_params.get('q')
        state = self.request.query_params.get('state')

        if (query or state) is not None:
            queryset = queryset.filter(
                Q(user__state__icontains=state) &
                (Q(user__first_name__icontains=query)
                 | Q(user__last_name__icontains=query)
                 | Q(field__icontains=query)
                 )
            )
            return queryset
        return queryset
