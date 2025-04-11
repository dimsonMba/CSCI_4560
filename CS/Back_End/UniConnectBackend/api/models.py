from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    password = models.CharField(max_length=128, default="1234")  # hashed password
    student_id = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=100 , null=True, blank=True)
    last_name = models.CharField(max_length=100 , null=True, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    # Add other student fields as needed

    def __str__(self):
        return f"{self.first_name} {self.last_name}"