from rest_framework import serializers
from rest_framework_simplejwt import serializers as jwt_serializers, exceptions as jwt_exceptions
from django.template.loader import render_to_string
from hcb.models import User, UserToken
from hcb.utils import generate_random_code, sendEmail


class UserSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password', 'role')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.is_active = False
        user.save()
        randToken = generate_random_code()
        UserToken.objects.create(user=user, token=randToken)

        subject = "Account Activation"
        recipient_list = [user.email]  # Use the user's email address here

        html_message = render_to_string('account_activation.html', {
            "token": randToken
        })
        sendEmail(subject, recipient_list, html_message)
        return user

    def to_representation(self, instance):
        data = super().to_representation(instance)
        user = instance

        data['emailVerifield'] = user.is_active
        return data


class UserSeriliazer(serializers.ModelSerializer):
    firstname = serializers.CharField(source='first_name')
    lastname = serializers.CharField(source='last_name')
    emailVerifield = serializers.BooleanField(source='is_active')

    class Meta:
        model = User
        fields = ('id', 'image', 'role', 'email',
                  'state', 'firstname', 'lastname', "is_complete", 'is_active', 'emailVerifield')


class UserProfileSeriliazer(serializers.ModelSerializer):
    firstname = serializers.CharField(source='first_name')
    lastname = serializers.CharField(source='last_name')

    class Meta:
        model = User
        fields = ('id', 'image', 'role', 'email',
                  'state', 'firstname', 'lastname', "is_complete")

    def to_representation(self, instance):
        data = super().to_representation(instance)
        user = instance
        if user.role == 'PATIENT':
            data['total_pending_appointment'] = user.patient.appointments(
                status='PENDING').count()
            data['isProfileComplete'] = user.patient.isPatientComplete()
        elif user.role == 'DOCTOR':
            data['total_pending_appointment'] = user.doctor.appointments(
                status='PENDING').count()
        return data


class CookieTokenRefreshSerializer(jwt_serializers.TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh_token')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise jwt_exceptions.InvalidToken(
                'No valid token found in cookie \'refresh\'')
