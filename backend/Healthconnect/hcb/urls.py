from django.urls import path

from .views import (
    appointment_views as appointment, user_views as user,
    blog_views as blog, doctor_views as doctor,
    patient_views as patient, review_views as review)

urlpatterns = [
    path('signup/', user.UserRegistrationView.as_view()),
    path('confirm/account/', user.ConfirmAccount.as_view()),
    path('login/', user.LoginView.as_view()),
    path('logout/', user.logout),
    path('user/', user.SingleUserView.as_view(), name='singleUser'),
    path('patient/', patient.GetUpdateDeletePatientProfileView.as_view()),
    path('doctor/', doctor.GetUpdateDeleteDoctorProfileView.as_view()),
    path('appointment/', appointment.AppointmentView.as_view()),
    path('review/', review.ReviewView.as_view(), name='review'),
    path('blog/', blog.BlogView.as_view()),
    path('resend_otp/', user.ResendOTP.as_view()),
    path('forget_password/', user.ForgetPassword.as_view()),
    path('reset_password/', user.ResetPassword.as_view()),
    path('doctors/all/', doctor.GetAllDoctors.as_view()),
    path('doctor/register/', doctor.CreateDoctor.as_view()),
    path('patient/register/', patient.CreatePatient.as_view()),
    path('token/refresh/', user.CookieTokenRefreshView.as_view(),
         name='token_refresh'),

    path('user/<str:pk>/', user.ProfileDetailVeiw.as_view()),
    path('appointment/overview/', appointment.AppointmentOverviewView.as_view()),
    path('appointment/<str:pk>/', appointment.AppointmentPutDetailVeiw.as_view()),
    path('blog/<str:pk>/', blog.BlogDetailView.as_view())
]
