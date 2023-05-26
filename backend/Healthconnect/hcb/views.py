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

from rest_framework_simplejwt.tokens import RefreshToken
from django.middleware import csrf
from django.conf import settings
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt import tokens, views as jwt_views, serializers as jwt_serializers, exceptions as jwt_exceptions
from .models import User,Doctor,Patient,Appointment,Review,Blog
from .serializers import (UserSignUpSerializer,MyTokenObtainPairSerializer,
                          PatientProfileSerializer,DoctorProfileSerializer,
                          UserProfileSeriliazer,
                          AppointmentSerializer,
                          PatientOverviewSerializer,
                          DoctorOverviewSerializer,
                          ReviewSerializer,
                          BlogSerializer,
                          )
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .permissions import IsAdminOrReadOnly
from .pagination import BlogPagination









    
    

    
      

    


        
    

      


    

   

        
      

    

    
    
    
    

    

        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
