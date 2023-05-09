from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path('signup/',views.UserRegistrationView.as_view()),
    path('login/',views.LoginView.as_view()),
    path('logout/',views.logout),
    # path('signin/',views.MyTokenObtainPairView.as_view()),
    path('user/',views.singleUser,name='singleUser'),
    path('patient/',views.GetUpdateDeletePatientProfileView.as_view()),
    path('doctor/',views.GetUpdateDeleteDoctorProfileView.as_view()),
    path('doctors/all',views.GetAllDoctors.as_view()),
    path('token/refresh/', views.CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('profile/<str:pk>/',views.userProfileDetail)  
]