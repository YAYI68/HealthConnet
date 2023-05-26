
from rest_framework import serializers
from hcb.models import Blog

class BlogSerializer(serializers.ModelSerializer):
    excerpt = serializers.SerializerMethodField(read_only=True)
    date  = serializers.CharField(read_only=True,source='created_at')
    slug = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Blog
        fields = ('id','author','image','title','slug','excerpt','content','date','updated_at')
        
    def get_excerpt(self,obj):
        content = obj.content
        word = content[:100]
        return word

    def get_slug(self,obj):
        title = obj.title
        slug = title.replace(" ","-")
        return slug