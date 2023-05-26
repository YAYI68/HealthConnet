
from rest_framework import serializers
from hcb.models import Review



class ReviewSerializer(serializers.ModelSerializer):
    name = serializers.CharField(read_only=True,source='patient.user.fullname')
    image = serializers.ImageField(read_only=True,source='patient.user.image')

    class Meta:
        model = Review
        fields = ('id','content','name','image','date')   