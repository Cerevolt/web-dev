from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    message = 'Only admin users are allowed.'

    def has_permission(self, request, view):
        user = getattr(request, 'user', None)
        if not user or not user.is_authenticated:
            return False
        if not getattr(user, 'is_superuser', False):
            return False
        profile = getattr(user, 'profile', None)
        if not profile:
            return False
        if getattr(profile, 'role', None) != 'admin':
            return False
        return True


