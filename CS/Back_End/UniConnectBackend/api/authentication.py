from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.settings import api_settings
from rest_framework.exceptions import AuthenticationFailed
from .models import UniUser

class UniUserJWTAuthentication(JWTAuthentication):
    """
    Override SimpleJWT to look up UniUser by its user_id PK field.
    """
    def get_user(self, validated_token):
        user_id = validated_token[api_settings.USER_ID_CLAIM]
        try:
            return UniUser.objects.get(user_id=user_id)
        except UniUser.DoesNotExist:
            raise AuthenticationFailed('User not found', code='user_not_found')