

class ReviewView(generics.ListAPIView,generics.CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes= [IsAuthenticated]
    
    def get_object(self):
        user = self.request.user
        if user.role == 'PATIENT':
            return user.patient
        elif user.role == 'DOCTOR':
            return user.doctor
    
    def get_queryset(self):
        obj = self.get_object()
        queryset=obj.reviews
        return queryset
    
    def post(self, request):
        data = request.data
        patient = self.get_object()
        doctor = Doctor.objects.get(user__id=data['doctor_id'])
        if doctor != None or (patient.id != doctor.id) :
            print('doctor',doctor)
            review = Review.objects.create(
                 patient=patient,
                 doctor=doctor,
                 content=data['content'],
             )
            serializer = ReviewSerializer(review,many=False)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)