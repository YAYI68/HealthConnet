from rest_framework import serializers
from rest_framework_simplejwt import  serializers as jwt_serializers, exceptions as jwt_exceptions
from hcb.models import User



class UserSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password','role')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        if user.role == 'DOCTOR':
            user.is_staff = True
            user.save()
            return user
        return user
        

class UserProfileSeriliazer(serializers.ModelSerializer):
    firstname  = serializers.CharField(source='first_name')
    lastname = serializers.CharField(source='last_name')
   
    class Meta:
        model=User
        fields=('id','image','role','email','firstname','lastname')  
        
    def to_representation(self,instance):
        data = super().to_representation(instance)
        user = instance
        if user.role == 'PATIENT':
            data['total_pending_appointment'] = user.patient.appointments(status='PENDING').count()
        elif user.role=='DOCTOR':
            data['total_pending_appointment'] = user.doctor.appointments(status='PENDING').count()
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