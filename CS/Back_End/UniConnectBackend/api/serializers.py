# api/serializers.py

from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import UniUser

class UniUserSerializer(serializers.ModelSerializer):
    # write-only fields for signup
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model  = UniUser
        fields = [
            'student_id',
            'username',
            'password',
            'first_name',
            'last_name',
            'personal_email',
            'mtsu_email',
            'phone_number',
            'graduation_year',
            'major'
        ]

    def validate_username(self, value):
        if UniUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already taken. Please choose another.")
        return value

    def create(self, validated_data):
        username    = validated_data.pop('username')
        raw_password= validated_data.pop('password')
        validated_data['password'] = make_password(raw_password)
        return UniUser.objects.create(username=username, **validated_data)

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

class VerificationSerializer(serializers.Serializer):
    student_id = serializers.IntegerField()
    first_name = serializers.CharField()
    last_name  = serializers.CharField()
    mtsu_email = serializers.EmailField()

    def to_internal_value(self, data):
        # map React’s field names to our internal ones
        mapped = {
            'student_id': data.get('MTSU Number') or data.get('student_id'),
            'first_name': data.get('First name'),
            'last_name':  data.get('Last name'),
            'mtsu_email': data.get('MTSU Email'),
        }
        return super().to_internal_value(mapped)