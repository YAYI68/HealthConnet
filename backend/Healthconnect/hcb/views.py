from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework import exceptions as rest_exceptions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
from django.db.models import Q
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.middleware import csrf
from django.conf import settings
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt import tokens, views as jwt_views, serializers as jwt_serializers, exceptions as jwt_exceptions
from .models import User,Doctor,Patient,Appointment
from .serializers import (UserSignUpSerializer,MyTokenObtainPairSerializer,
                          PatientProfileSerializer,DoctorProfileSerializer,
                          UserProfileSeriliazer,
                          AppointmentSerializer,
                          PatientOverviewSerializer
                          )
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)




def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)    
    return {
        'refresh_token': str(refresh),
        'access_token': str(refresh.access_token),
    }
class LoginView(APIView):
    def post(self, request, format=None):
        data = request.data
        response = Response()        
        email = data.get('email', None)
        password = data.get('password', None)
        user = authenticate(email=email, password=password)
        if user is not None:
            data = get_tokens_for_user(user)
            response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value=data["access_token"],
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
             )
            response.set_cookie(
                key = settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'], 
                value = data["refresh_token"],
                expires = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )
            csrf.get_token(request)
            response.data = {"success" : "Login successfully",'access_token': data['access_token'],'refresh_token':data['refresh_token'],'role':user.role}
            response.status = status.HTTP_200_OK
            response['X-CSRFToken'] = csrf.get_token(request)
                
            return response
        raise rest_exceptions.AuthenticationFailed(
            'Invalid Email or password!!'
            )

@api_view(['POST'])
def logout(request):
    try:
        refresh = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        token = RefreshToken(refresh)
        token.blacklist()        
        res = Response()
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        res.delete_cookie('X-CSRFToken')
        res.delete_cookie('csrftoken')
        return res 
    except :
        raise  rest_exceptions.ParseError('Invalid Token')

class MyTokenRefresh(TokenRefreshView):
    
    def post(self, request):
        refresh = self.request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        response = Response()
        if refresh :
            data = {'refresh':refresh}
            serializer = self.get_serializer(data=data,many=False)
            if serializer.is_valid(raise_exception=True):
                response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=serializer.validated_data['refresh'],
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
                )
                response["X-CSRFToken"] = request.COOKIES.get("csrftoken")
                return Response(serializer.validated_data)
            return Response('Invalid Token')
        return Response({'error':'FORBIDDEN'},status=status.HTTP_403_FORBIDDEN)
    
class CookieTokenRefreshSerializer(jwt_serializers.TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh_token')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise jwt_exceptions.InvalidToken(
                'No valid token found in cookie \'refresh\'')
            
class CookieTokenRefreshView(jwt_views.TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=response.data['refresh'],
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )

            del response.data["refresh"]
        response["X-CSRFToken"] = request.COOKIES.get("csrftoken")
        return super().finalize_response(request, response, *args, **kwargs)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    
class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignUpSerializer
    
      
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
    
    
class GetUpdateDeleteDoctorProfileView(generics.UpdateAPIView,generics.DestroyAPIView,generics.RetrieveAPIView):
    serializer_class = DoctorProfileSerializer
    permission_classes= [IsAdminUser]
    
    def get_object(self):
        
        try:
            user = self.request.user
            return user.doctor
        except :
            raise ValueError('You can only updateDoctorProfile')
        
    def get_serializer_context(self):
        context = super(GetUpdateDeleteDoctorProfileView, self).get_serializer_context()
        context.update({"user": self.request.user})
        return context
        
    
    def delete(self,request):
        user = self.request.user
        user.delete()
        return Response({'message':'User sucessfully deleted'},status.HTTP_204_NO_CONTENT)

        
    
class GetAllDoctors(generics.ListAPIView):
    serializer_class = DoctorProfileSerializer
    permission_classes= [IsAuthenticated]
       
    def get_queryset(self):
        queryset=Doctor.objects.all()
        query = self.request.query_params.get('q')
        if query is not None:
            queryset = queryset.filter(Q(user__first_name__icontains=query)
                                       |Q(user__last_name__icontains=query)
                                       |Q(hospital__icontains=query)
                                       |Q(experience__icontains=query)
                                       )
            return queryset
        return queryset
      

class SingleUserView(generics.RetrieveAPIView):
    serializer_class = UserProfileSeriliazer
    permission_classes= [IsAuthenticated]
    
    def get_object(self):
        user = self.request.user
        return user
    

   
class ProfileDetailVeiw (generics.RetrieveAPIView):
    permission_classes= [IsAuthenticated]
    
    def get_object(self):
        id = self.kwargs['pk']
        user = User.objects.get(pk=id)
        if user.role == 'PATIENT':
            patient = user.patient
            return patient
        elif user.role == 'DOCTOR':
            doctor = user.doctor
            return doctor
            
    def get_serializer_class(self):
        obj = self.get_object()
        if obj.user.role == 'PATIENT':
            return PatientProfileSerializer
        elif obj.user.role == 'DOCTOR':
            return DoctorProfileSerializer   
        
class AppointmentView(generics.CreateAPIView):
    serializer_class = AppointmentSerializer 
    
    def post(self, request):
        user = request.user
        patient = user.patient
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
    
    def get_object(self):
        id = self.kwargs['pk']
        appointment = Appointment.objects.get(pk=id)
        return appointment
    
class AppointmentOverviewView(generics.RetrieveAPIView):
    serializer_class = PatientOverviewSerializer
    
    def get_object(self):
        user = self.request.user
        return user
    

       
    
    
    

    

        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
