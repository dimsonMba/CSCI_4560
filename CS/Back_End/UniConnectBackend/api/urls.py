from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    StudentInfoView,
    LoginView,
    CreateUserView,
    VerificationView,
    CurrentUserView,
    PostViewSet
)

router = DefaultRouter()
router.register(r'users', StudentInfoView, basename="uniuser")
router.register(r'posts', PostViewSet, basename="post")

urlpatterns = [
    path('verification/', VerificationView.as_view(), name='verification'),
    path('login/', LoginView.as_view(),        name='login'),
    path('register/',     CreateUserView.as_view(),   name='register'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    #path('chat/',         ChatView.as_view(),         name='chat'),  
    path('', include(router.urls)),
]
