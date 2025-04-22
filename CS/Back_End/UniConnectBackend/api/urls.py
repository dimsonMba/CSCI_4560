from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    StudentInfoView,
    LoginView,
    CreateUserView,
    VerificationView,
    CurrentUserView
)

router = DefaultRouter()
router.register(r'users', StudentInfoView, basename="uniuser")

urlpatterns = [
    path('verification/', VerificationView.as_view(), name='verification'),
    path('login/',        LoginView.as_view(),        name='login'),
    path('register/',     CreateUserView.as_view(),   name='register'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('', include(router.urls)),
]
