# api/urls.py
from rest_framework.routers import DefaultRouter
from .views import StudentInfoView
from django.urls import path, include

router = DefaultRouter()
router.register(r'students', StudentInfoView)

urlpatterns = [
    path('', include(router.urls)),
]