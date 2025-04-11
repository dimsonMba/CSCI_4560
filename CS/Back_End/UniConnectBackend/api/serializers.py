from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Student
        fields = ['username', 'password', 'student_id', 'first_name', 'last_name', 'email']

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already taken. Please choose another.")
        return value

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = make_password(validated_data.pop('password'))  # Hash password

        # Create the user
        user = User.objects.create(username=username)
        user.set_password(password)
        user.save()

        # Create the student profile
        return Student.objects.create(user=user, password=password, **validated_data)
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)