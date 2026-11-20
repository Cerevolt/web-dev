from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .authentication import is_approved_active_user
from .models import Profile


class UserMeSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    # Status is safe to expose to the account owner. It is a plain string and
    # lets the frontend keep its session state accurate after approval changes.
    status = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'role', 'status']

    def get_role(self, obj):
        profile = getattr(obj, 'profile', None)
        if not profile:
            return None
        return profile.role

    def get_status(self, obj):
        profile = getattr(obj, 'profile', None)
        if not profile:
            return None
        return profile.status


class UserCreateSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=['parent', 'consultant', 'school', 'child'])
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)

    def validate_email(self, value):
        email = value.strip().lower()
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError('A user with this email already exists.')
        if Profile.objects.filter(normalized_email__iexact=email).exists():
            raise serializers.ValidationError('A user with this email already exists.')
        return email


    def validate_password(self, value):
        validate_password(value)
        return value


PUBLIC_REGISTRATION_ROLES = ('admin', 'parent', 'child', 'consultant', 'school')

# Every publicly registered account is approved immediately. Approval is not
# part of the public registration flow; the status field remains available for
# existing accounts and administrative actions.
PUBLIC_REGISTRATION_STATUS = {role: 'approved' for role in PUBLIC_REGISTRATION_ROLES}


class PublicRegistrationSerializer(serializers.Serializer):
    """Public self-registration for all five roles.

    The client may send a role, but only the roles in PUBLIC_REGISTRATION_ROLES
    are accepted. Account status and privileged flags are never read from the
    request; they are assigned server-side. Unknown keys (for example
    ``is_staff``) are ignored by DRF.
    """

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    # Optional so existing parent-only clients that omit ``role`` keep working.
    role = serializers.ChoiceField(
        choices=['parent', 'child', 'consultant', 'school', 'admin'],
        required=False,
        default='parent',
    )
    first_name = serializers.CharField(required=False, allow_blank=True, max_length=150)
    last_name = serializers.CharField(required=False, allow_blank=True, max_length=150)

    def validate_email(self, value):
        email = value.strip().lower()
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError('A user with this email already exists.')
        if Profile.objects.filter(normalized_email__iexact=email).exists():
            raise serializers.ValidationError('A user with this email already exists.')
        return email

    def validate_password(self, value):
        validate_password(value)
        return value


class ApprovedTokenRefreshSerializer(TokenRefreshSerializer):
    """Refresh tokens only for active, approved accounts.

    Rotation and blacklisting are still handled by the parent serializer.
    """

    def validate(self, attrs):
        token = RefreshToken(attrs['refresh'])
        user = JWTAuthentication().get_user(token)
        if not is_approved_active_user(user):
            raise serializers.ValidationError('This account is not approved for token refresh.')
        return super().validate(attrs)

