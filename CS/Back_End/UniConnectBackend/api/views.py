# FILE: views.py

from rest_framework import status, permissions, generics, viewsets
from rest_framework.views    import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.hashers     import make_password, check_password
from django.db                       import IntegrityError

from .models      import UniversityData, UniUser
from .serializers import (
    UniUserSerializer,
    LoginSerializer,
    VerificationSerializer
)

class CreateUserView(generics.ListCreateAPIView):
    queryset         = UniUser.objects.all()
    serializer_class = UniUserSerializer
    permission_classes = [permissions.AllowAny]

class VerificationView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = VerificationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        sid   = serializer.validated_data['student_id']
        fn    = serializer.validated_data['first_name'].strip().lower()
        ln    = serializer.validated_data['last_name'].strip().lower()
        email = serializer.validated_data['mtsu_email'].lower()

        try:
            master = UniversityData.objects.get(student_id=sid, mtsu_email=email)
        except UniversityData.DoesNotExist:
            return Response(
                {'success': False, 'message': 'Student record not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

        if master.first_name.lower() != fn or master.last_name.lower() != ln:
            return Response(
                {'success': False, 'message': 'Name does not match records.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response({
            'success': True,
            'user': {
                'student_id':      master.student_id,
                'first_name':      master.first_name,
                'last_name':       master.last_name,
                'mtsu_email':      master.mtsu_email,
                'graduation_year': master.grad_year,
                'major':           master.major,
            }
        }, status=status.HTTP_200_OK)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        try:
            user = UniUser.objects.get(username=username)
            if check_password(password, user.password):
                refresh = RefreshToken()
                refresh['user_id'] = user.user_id

                return Response({
                    'message': 'Login successful',
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': UniUserSerializer(user).data
                }, status=status.HTTP_200_OK)
            else:
                return Response(
                    {'error': 'Invalid credentials'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except UniUser.DoesNotExist:
            return Response(
                {'error': 'Username or password is incorrect.'},
                status=status.HTTP_404_NOT_FOUND
            )

class StudentInfoView(viewsets.ModelViewSet):
    queryset         = UniUser.objects.all()
    serializer_class = UniUserSerializer

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    
class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UniUserSerializer(request.user)
        return Response(serializer.data)

@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def current_user_view(request):
    serializer = UniUserSerializer(request.user)
    return Response(serializer.data)
