from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.hashers import check_password
from .models import UniUser  # Changed model from Student to UniUser
from .serializers import UniUserSerializer, LoginSerializer

class CreateUserView(generics.ListCreateAPIView):
    queryset = UniUser.objects.all()
    serializer_class = UniUserSerializer
    permission_classes = [permissions.AllowAny]  # Allow unauthenticated sign-up

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]  # Allow unauthenticated login
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            try:
                user = UniUser.objects.get(username=username)
                if check_password(password, user.password):
                    return Response(
                        {"message": "Login successful"}, 
                        status=status.HTTP_200_OK
                    )
                else:
                    return Response(
                        {"error": "Invalid credentials"}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
            except UniUser.DoesNotExist:
                return Response(
                    {"error": "User not found"}, 
                    status=status.HTTP_404_NOT_FOUND
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentInfoView(viewsets.ModelViewSet):
    """
    This viewset will allow unauthenticated create,
    but for all other actions, the user must be authenticated.
    """
    queryset = UniUser.objects.all()
    serializer_class = UniUserSerializer

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]