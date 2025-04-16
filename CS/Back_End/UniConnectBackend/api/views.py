from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.hashers import check_password
from .models import UniUser  # Changed model from Student to UniUser
from .serializers import UniUserSerializer, LoginSerializer
from django.db import DatabaseError, IntegrityError

class CreateUserView(generics.ListCreateAPIView):
    queryset = UniUser.objects.all()
    serializer_class = UniUserSerializer
    permission_classes = [permissions.AllowAny]  # Allow unauthenticated sign-up

class VerificationView(APIView):
    def post():
        pass

# In LoginView
from rest_framework_simplejwt.tokens import RefreshToken

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]  # Allow unauthenticated login
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            try:
                student = UniUser.objects.get(username=username)
                if check_password(password, student.password):
                    refresh = RefreshToken.for_user(student)
                    return Response({
                        "message": "Login successful",
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                        "user": UniUserSerializer(student).data
                    }, status=status.HTTP_200_OK)
                else:
                    return Response(
                        {"error": "Invalid credentials"}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
            except UniUser.DoesNotExist as e:
                return Response(
                    {"error": "Username or password is incorrect."}, 
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