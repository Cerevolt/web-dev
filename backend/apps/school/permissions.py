from rest_framework.permissions import BasePermission


class IsAdminOrSchool(BasePermission):
    message = 'Only admin or school users are allowed.'

    def has_permission(self, request, view):
        user = getattr(request, 'user', None)
        if not user or not user.is_authenticated:
            return False
        profile = getattr(user, 'profile', None)
        if not profile:
            return False
        role = getattr(profile, 'role', None)
        if role == 'admin' and getattr(user, 'is_superuser', False):
            return True
        if role == 'school':
            return True
        return False

    def has_object_permission(self, request, view, obj):
        user = getattr(request, 'user', None)
        if not user or not user.is_authenticated:
            return False
        profile = getattr(user, 'profile', None)
        if not profile:
            return False
        role = getattr(profile, 'role', None)
        if role == 'admin' and getattr(user, 'is_superuser', False):
            return True
        if role == 'school':
            if hasattr(obj, 'owner') and obj.owner == user:
                return True
            if hasattr(obj, 'school'):
                school = obj.school
                if hasattr(school, 'owner') and school.owner == user:
                    return True
            return False
        return False


class IsSchoolUser(BasePermission):
    message = 'Only school users are allowed.'

    def has_permission(self, request, view):
        user = getattr(request, 'user', None)
        if not user or not user.is_authenticated:
            return False
        profile = getattr(user, 'profile', None)
        if not profile:
            return False
        return getattr(profile, 'role', None) == 'school'

    def has_object_permission(self, request, view, obj):
        user = getattr(request, 'user', None)
        if not user or not user.is_authenticated:
            return False
        profile = getattr(user, 'profile', None)
        if not profile:
            return False
        if getattr(profile, 'role', None) != 'school':
            return False
        if hasattr(obj, 'owner') and obj.owner == user:
            return True
        if hasattr(obj, 'school'):
            school = obj.school
            if hasattr(school, 'owner') and school.owner == user:
                return True
        return False
