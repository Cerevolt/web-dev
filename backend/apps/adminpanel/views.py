from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from apps.accounts.permissions import IsAdmin
from apps.accounts.models import Profile
from .models import AdminActivityLog


@api_view(['GET'])
@permission_classes([IsAdmin])
def admin_dashboard(request):
    total_users = User.objects.count()
    active_users = User.objects.filter(is_active=True).count()
    inactive_users = User.objects.filter(is_active=False).count()

    users_by_role = (
        Profile.objects.values('role')
        .annotate(count=Count('role'))
        .order_by('role')
    )
    role_counts = {item['role']: item['count'] for item in users_by_role}

    total_admin_logs = AdminActivityLog.objects.count()

    data = {
        'total_users': total_users,
        'active_users': active_users,
        'inactive_users': inactive_users,
        'users_by_role': role_counts,
        'total_admin_activity_logs': total_admin_logs,
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAdmin])
def admin_user_list(request):
    users = User.objects.select_related('profile').all()
    data = []
    for user in users:
        profile = getattr(user, 'profile', None)
        data.append({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'is_active': user.is_active,
            'is_superuser': user.is_superuser,
            'role': profile.role if profile else None,
        })
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAdmin])
def admin_user_detail(request, user_id):
    try:
        user = User.objects.select_related('profile').get(id=user_id)
    except User.DoesNotExist:
        return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
    profile = getattr(user, 'profile', None)
    data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'is_active': user.is_active,
        'is_superuser': user.is_superuser,
        'role': profile.role if profile else None,
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
@permission_classes([IsAdmin])
def admin_user_update(request, user_id):
    try:
        user = User.objects.select_related('profile').get(id=user_id)
    except User.DoesNotExist:
        return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    if user == request.user and 'role' in request.data:
        return Response({'detail': 'Cannot change your own role.'}, status=status.HTTP_403_FORBIDDEN)

    profile = getattr(user, 'profile', None)
    data = request.data
    updated = False
    role_changed = False

    if 'first_name' in data:
        user.first_name = data['first_name']
        updated = True
    if 'last_name' in data:
        user.last_name = data['last_name']
        updated = True
    if 'email' in data:
        new_email = str(data['email']).strip().lower()
        if User.objects.filter(email__iexact=new_email).exclude(id=user.id).exists():
            return Response({'detail': 'Email already in use.'}, status=status.HTTP_400_BAD_REQUEST)
        if Profile.objects.filter(normalized_email__iexact=new_email).exclude(user_id=user.id).exists():
            return Response({'detail': 'Email already in use.'}, status=status.HTTP_400_BAD_REQUEST)
        user.email = new_email
        user.username = new_email
        if profile:
            profile.normalized_email = new_email
        updated = True

    if 'role' in data:
        new_role = data['role']
        if not profile:
            return Response({'detail': 'User profile not found.'}, status=status.HTTP_400_BAD_REQUEST)
        allowed_roles = [choice[0] for choice in Profile.ROLE_CHOICES]
        if new_role not in allowed_roles:
            return Response({'detail': 'Invalid role.'}, status=status.HTTP_400_BAD_REQUEST)
        if new_role == 'admin':
            if not request.user.is_superuser:
                return Response({'detail': 'Cannot assign admin role.'}, status=status.HTTP_403_FORBIDDEN)
            user.is_superuser = True
        if profile.role == 'admin' and new_role != 'admin':
            if not request.user.is_superuser:
                return Response({'detail': 'Cannot change admin role.'}, status=status.HTTP_403_FORBIDDEN)
            user.is_superuser = False
        if profile.role != new_role:
            profile.role = new_role
            role_changed = True
            AdminActivityLog.objects.create(
                admin_user=request.user,
                target_user=user,
                action='role_changed',
                description=f'Role changed to {new_role}'
            )
        updated = True

    if updated:
        user.save()
        if profile:
            profile.save()
        AdminActivityLog.objects.create(
            admin_user=request.user,
            target_user=user,
            action='user_updated',
            description='User details updated'
        )

    profile = getattr(user, 'profile', None)
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'is_active': user.is_active,
        'is_superuser': user.is_superuser,
        'role': profile.role if profile else None,
    }, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAdmin])
def admin_user_activate_deactivate(request, user_id):
    try:
        user = User.objects.select_related('profile').get(id=user_id)
    except User.DoesNotExist:
        return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    action = request.data.get('action')
    if action == 'activate':
        user.is_active = True
        user.save()
        AdminActivityLog.objects.create(
            admin_user=request.user,
            target_user=user,
            action='user_activated',
            description='User activated'
        )
        return Response({'detail': 'User activated.'}, status=status.HTTP_200_OK)
    elif action == 'deactivate':
        if user == request.user:
            return Response({'detail': 'Cannot deactivate yourself.'}, status=status.HTTP_400_BAD_REQUEST)
        profile = getattr(user, 'profile', None)
        if profile and profile.role == 'admin' and not request.user.is_superuser:
            return Response({'detail': 'Cannot deactivate admin user.'}, status=status.HTTP_403_FORBIDDEN)
        user.is_active = False
        user.save()
        AdminActivityLog.objects.create(
            admin_user=request.user,
            target_user=user,
            action='user_deactivated',
            description='User deactivated'
        )
        return Response({'detail': 'User deactivated.'}, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)

