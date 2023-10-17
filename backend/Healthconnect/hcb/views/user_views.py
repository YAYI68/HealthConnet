from django.template.loader import render_to_string
from django.middleware import csrf
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt import tokens, views as jwt_views, serializers as jwt_serializers, exceptions as jwt_exceptions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import exceptions as rest_exceptions
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from decouple import config
from hcb.models import User, UserToken
from hcb.serializers.user_serializers import UserProfileSeriliazer, UserSignUpSerializer, CookieTokenRefreshSerializer
from hcb.serializers.patient_serializers import PatientProfileSerializer
from hcb.serializers.doctor_serializers import DoctorProfileSerializer
from hcb.utils import sendEmail


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignUpSerializer


class ConfirmAccount(APIView):
    def post(self, request):
        data = request.data
        token = data.get('token')
        # print(data)
        userToken = UserToken.objects.get(token=token)
        user = userToken.user
        user.is_active = True
        user.save()
        print(user)
        return Response({"message": "Account Successfully Activated"}, status=status.HTTP_201_CREATED)


class forgetPassword(APIView):

    def post(self, request):
        data = request.data
        email = data.get('email')
        try:
            user = User.objects.get(email=email)
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            link = f"{config('CLIENT_URL')}/reset/?uid={uid}&token={token}"
            subject = "Password Reset Request"
            recipient_list = [user.email]

            html_message = render_to_string('forget_password_email.html', {
                "name": user.first_name,
                "link": link
            })
            sendEmail(subject, recipient_list, html_message)
            return Response({"message": "Password reset successfully sent,Kindly check your email to reset your password"}, status=status.HTTP_200_OK)
        except:
            return Response({"message": "User not Found"}, status=status.HTTP_404_NOT_FOUND)


class resetPassword(APIView):

    def post(request):
        data = request.data
        uid = data.get('uid')
        token = data.get('token')
        password = data.get('password')

        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=user_id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"message": "User not Found"}, status=status.HTTP_404_NOT_FOUND)
        if user and default_token_generator.check_token(user, token):
            user.set_password(password)
            user.save()
            return Response({"message": "Password reset successfully."}, status=status.HTTP_201_CREATED)


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
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=data["refresh_token"],
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )
            csrf.get_token(request)
            userInfo = UserProfileSeriliazer(user).data
            response.data = {"success": "Login successfully",
                             'access_token': data['access_token'], 'refresh_token': data['refresh_token'], 'user': userInfo}
            response.status = status.HTTP_200_OK
            response['X-CSRFToken'] = csrf.get_token(request)

            return response
        raise rest_exceptions.AuthenticationFailed(
            'Invalid Email or password!!'
        )


@api_view(['POST'])
def logout(request):
    try:
        refresh = request.COOKIES.get(
            settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        token = RefreshToken(refresh)
        token.blacklist()
        res = Response()
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        res.delete_cookie('X-CSRFToken')
        res.delete_cookie('csrftoken')
        return res
    except:
        raise rest_exceptions.ParseError('Invalid Token')


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


class SingleUserView(generics.RetrieveAPIView):
    serializer_class = UserProfileSeriliazer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        return user


class ProfileDetailVeiw (generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

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
