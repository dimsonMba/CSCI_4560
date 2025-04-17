from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.hashers import check_password
from .models import UniUser  # Changed model from Student to UniUser
from .serializers import UniUserSerializer, LoginSerializer, VerificationSeriliazer
from django.db import DatabaseError, IntegrityError

class CreateUserView(generics.ListCreateAPIView):
    queryset = UniUser.objects.all()
    serializer_class = UniUserSerializer
    permission_classes = [permissions.AllowAny]  # Allow unauthenticated sign-up

class VerificationView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = VerificationSeriliazer(data=request.data)

        if serializer.is_valid():
            student_id = serializer.validated_data['student_id']
            first_name = serializer.validated_data['first_name']
            last_name = serializer.validated_data['last_name']
            email = serializer.validated_data['email']

            try:
                student = UniUser.objects.get(student_id=student_id)

                # If found, issue tokens and return user data
                refresh = RefreshToken.for_user(student)
                return Response({
                    "message": "User already exists. Logged in.",
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "user": UniUserSerializer(student).data
                }, status=status.HTTP_200_OK)

            except UniUser.DoesNotExist:
                # User doesn't exist — register and issue token
                student = UniUser.objects.create(
                    student_id=student_id,
                    first_name=first_name,
                    last_name=last_name,
                    email=email,
                    username=email,  # assuming you want to use email as username
                    #password=make_password("default_password123")  # set a random/initial password
                )
                refresh = RefreshToken.for_user(student)
                return Response({
                    "message": "User registered successfully",
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "user": UniUserSerializer(student).data
                }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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