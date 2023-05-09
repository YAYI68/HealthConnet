from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User,Patient,Doctor


class UserSerializerToken(serializers.ModelSerializer):
    slug = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ('id','role','email','slug')
        
    def get_slug(self,obj):
        slug = f'{obj.first_name}-{obj.last_name}'
        return slug


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    class Meta:
        fields = ('role','email','password')
        model = User
        
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["role"] = user.role

        return token

    # def validate(self, attrs):
    #     data = super().validate(attrs)

    #     serializer = UserSerializerToken(self.user).data
    #     for k, v in serializer.items():
    #         data[k] = v
    #     return data

class UserSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password','role')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        if user.role == 'Doctor':
            user.is_staff = True
            user.save()
            return user
        return user


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password','role')
        extra_kwargs = {'password': {'write_only': True}}
        

class UserProfileSeriliazer(serializers.ModelSerializer):
   
    class Meta:
        model=User
        fields=('id','image','role','email','first_name','last_name','phone_number','gender','state','country')  
        
      
             

    
class PatientProfileSerializer(serializers.ModelSerializer):
    uid = serializers.CharField(read_only=True,source='user.id')
    image = serializers.ImageField(source='user.image')
    email = serializers.EmailField(read_only=True,source='user.email')
    firstname  = serializers.CharField(source='user.first_name')
    lastname = serializers.CharField(source='user.last_name')
    phonenumber = serializers.CharField(source='user.phone_number')
    gender = serializers.CharField(source='user.gender')
    state = serializers.CharField(source='user.state') 
    country = serializers.CharField(source='user.country')   
    class Meta:
        model=Patient
        fields=('uid','image','email','firstname','lastname','phonenumber','gender','state','country','blood_group','age','weight','genotype','marital_status','medical_history')
        
    def update(self,instance,validated_data):
        user_data = validated_data.get('user',None)
        user = instance.user
        if user_data is not None:
            user.first_name = user_data.get('first_name',user.first_name)
            user.image = user_data.get('image',user.image)
            user.last_name = user_data.get('last_name',user.last_name)
            user.phone_number = user_data.get('phone_number',user.phone_number)
            user.gender = user_data.get('gender',user.gender)
            user.state = user_data.get('state',user.state)
            user.country = user_data.get('country',user.country)
            user.save()
        instance.blood_group = validated_data.get('blood_group',instance.blood_group)
        instance.age = validated_data.get('age',instance.age)
        instance.weight = validated_data.get('weight',instance.weight)
        instance.genotype = validated_data.get('genotype',instance.genotype)
        instance.marital_status = validated_data.get('marital_status',instance.marital_status)
        instance.medical_history = validated_data.get('medical_history',instance.medical_history)
        instance.save()
        return instance
             
class DoctorProfileSerializer(serializers.ModelSerializer):
    uid = serializers.CharField(read_only=True,source='user.id')
    image = serializers.ImageField(source='user.image')
    email = serializers.EmailField(read_only=True,source='user.email')
    firstname  = serializers.CharField(source='user.first_name')
    lastname = serializers.CharField(source='user.last_name')
    phonenumber = serializers.CharField(source='user.phone_number')
    gender = serializers.CharField(source='user.gender')
    state = serializers.CharField(source='user.state') 
    country = serializers.CharField(source='user.country')  
    class Meta:
        model=Doctor
        fields=('uid','image','email','firstname','lastname','phonenumber','gender','state','country','hospital','experience','field','bio','qualification','location')

    def update(self,instance,validated_data):
        user_data = validated_data.get('user',None)
        user = instance.user
        if user_data is not None:
            user.first_name = user_data.get('first_name',user.first_name)
            user.image = user_data.get('image',user.image)
            user.last_name = user_data.get('last_name',user.last_name)
            user.phone_number = user_data.get('phone_number',user.phone_number)
            user.gender = user_data.get('gender',user.gender)
            user.state = user_data.get('state',user.state)
            user.country = user_data.get('country',user.country)
            user.save()
        instance.hospital = validated_data.get('hospital',instance.hospital) 
        instance.experience = validated_data.get('experience',instance.experience)  
        instance.field = validated_data.get('field',instance.field) 
        instance.bio = validated_data.get('bio',instance.bio) 
        instance.qualification = validated_data.get('qualification',instance.qualification) 
        instance.location = validated_data.get('location',instance.location) 
        instance.save()
        return instance   
    
         
    

# class PatientSerializer(serializers.ModelSerializer): 
#     class  Meta:
#         model = Patient
#         fields=('blood_group','age','weight','genotype','marital_status','medical_history')
        
#     def update(self,instance,validated_data):
#         print('validated_data', validated_data)
#         return instance
    
#     def to_representation(self, instance):
#         print('att',instance)
#         data = super().to_representation(instance)
#         user = self.context['user']
#         serializer = UserProfileSeriliazer(user).data
#         print(serializer)
#         for k, v in serializer.items():
#             data[k] = v
#         return data        
  