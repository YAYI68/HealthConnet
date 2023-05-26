
from hcb.models import Blog

class BlogView(generics.CreateAPIView,generics.ListAPIView):
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()
    pagination_class = BlogPagination
    
    def post(self, request):
        user = request.user
        
        if not user.is_superuser: 
            raise rest_exceptions.PermissionDenied(
            'UnAuthorized User '
            )
        
        data = request.data
        blog=Blog.objects.create(
            author=user,
            title=data['title'],
            content=data['content'],
            image = data['image'],
        )
        serializer = BlogSerializer(blog,many=False)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    
    
    
class BlogDetailView(generics.RetrieveAPIView,generics.DestroyAPIView,generics.UpdateAPIView):
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()
    