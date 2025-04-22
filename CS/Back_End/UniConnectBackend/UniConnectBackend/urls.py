from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api.views import CreateUserView, LoginView, StudentInfoView, VerificationView

router = routers.DefaultRouter()
router.register(r'students', StudentInfoView)  # For student data management

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', CreateUserView.as_view(), name='register'),
    path('api/verification/', VerificationView.as_view(), name='verification'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/student/', include(router.urls)),  # For student data access
    path('api/', include('api.urls')),  # 👈 This line is essential
    path('api-auth/', include('rest_framework.urls')),  # For browsable API login
]
