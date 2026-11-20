from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication


def is_approved_active_user(user):
    """Return True only for an active user with an approved profile."""
    if not user or not user.is_active:
        return False
    profile = getattr(user, 'profile', None)
    if profile is None:
        return False
    return getattr(profile, 'status', None) == 'approved'


class ApprovedJWTAuthentication(JWTAuthentication):
    """JWT authentication that also enforces the account approval gate.

    Used as the DRF default authentication class so a status change takes
    effect immediately, without waiting for the access token to expire.
    """

    def get_user(self, validated_token):
        user = super().get_user(validated_token)
        if not is_approved_active_user(user):
            raise AuthenticationFailed('This account is not approved for access.')
        return user
