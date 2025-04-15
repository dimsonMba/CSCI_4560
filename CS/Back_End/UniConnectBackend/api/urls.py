from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentInfoView, LoginView, CreateUserView

router = DefaultRouter()
router.register(r'users', StudentInfoView, basename="uniuser")

urlpatterns = [
    # URL for login might need to be added explicitly:
    path('login/', LoginView.as_view(), name='login'),
    # Alternatively, add a dedicated registration URL if you prefer:
    path('register/', CreateUserView.as_view(), name='register'),
    path('', include(router.urls)),
]