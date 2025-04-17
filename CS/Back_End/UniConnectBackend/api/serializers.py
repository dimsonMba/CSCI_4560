from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import UniUser

class UniUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = UniUser
        fields = ['username', 'password', 'first_name', 'last_name', 'email']
    
    def validate_username(self, value):
        if UniUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already taken. Please choose another.")
        return value

    def create(self, validated_data):
        username = validated_data.pop('username')
        raw_password = validated_data.pop('password')
        hashed_password = make_password(raw_password)  # Hash the password
        return UniUser.objects.create(username=username, password=hashed_password, **validated_data)

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

class VerificationSeriliazer(serializers.Serializer):
    student_id = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField()