from django.contrib.auth.models import User
from django.db import IntegrityError, transaction
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .models import ParentChildLink, Profile
from .permissions import IsAdmin, IsParent
from .serializers import (
    PUBLIC_REGISTRATION_STATUS,
    PublicRegistrationSerializer,
    UserCreateSerializer,
    UserMeSerializer,
)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """Public role-aware self-registration for all five roles.

    Every account is created approved and can sign in immediately. The role,
    approval status and privileged flags are always assigned server-side.
    """
    serializer = PublicRegistrationSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data
    normalized_email = data['email']
    role = data.get('role', 'parent')
    profile_status = PUBLIC_REGISTRATION_STATUS.get(role)
    if profile_status is None:
        return Response(
            {'detail': 'This role cannot be registered publicly.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user_fields = {
        'username': normalized_email,
        'email': normalized_email,
        'password': data['password'],
        'first_name': data.get('first_name', ''),
        'last_name': data.get('last_name', ''),
    }

    try:
        with transaction.atomic():
            # A publicly registered admin needs the existing superuser flag so
            # the unchanged IsAdmin permission and login checks still work.
            if role == 'admin':
                user = User.objects.create_superuser(**user_fields)
            else:
                user = User.objects.create_user(**user_fields)
            Profile.objects.create(
                user=user,
                role=role,
                normalized_email=normalized_email,
                status=profile_status,
            )
    except IntegrityError:
        return Response(
            {'detail': 'Failed to create account.'},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Exception:
        return Response(
            {'detail': 'Failed to create account.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    return Response({
        'id': user.id,
        'email': user.email,
        'role': role,
        'status': profile_status,
        'first_name': user.first_name,
        'last_name': user.last_name,
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email', '')
    password = request.data.get('password', '')
    if not email or not password:
        return Response({'detail': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
    email_norm = str(email).strip().lower()
    profile = Profile.objects.filter(normalized_email=email_norm).select_related('user').first()
    if not profile:
        user = User.objects.filter(email__iexact=email_norm)
        if user.count() > 1:
            return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        user = user.first()
        if not user:
            return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        profile = getattr(user, 'profile', None)
        if not profile:
            return Response({'detail': 'User profile not found.'}, status=status.HTTP_401_UNAUTHORIZED)
    user = profile.user
    if not user.check_password(password):
        return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
    if not user.is_active:
        return Response({'detail': 'User account is inactive.'}, status=status.HTTP_401_UNAUTHORIZED)
    if profile.role == 'admin' and not user.is_superuser:
        return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
    if profile.status != 'approved':
        # Reached only with correct credentials, so this does not disclose
        # account existence to an unauthenticated caller.
        return Response(
            {'detail': 'This account is not approved for login.'},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    refresh = RefreshToken.for_user(user)
    data = {
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'user': {
            'id': user.id,
            'email': user.email,
            'role': profile.role,
        }
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    refresh_token = request.data.get('refresh')
    if not refresh_token:
        return Response({'detail': 'Refresh token is required.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        token = RefreshToken(refresh_token)
        token_user_id = token.get('user_id')
        if token_user_id is not None and int(token_user_id) != int(request.user.pk):
            return Response({'detail': 'Token does not belong to this user.'}, status=status.HTTP_403_FORBIDDEN)
        token.blacklist()
        return Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)
    except TokenError:
        return Response({'detail': 'Invalid or already blacklisted token.'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception:
        return Response({'detail': 'Invalid or already blacklisted token.'}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me_view(request):
    user = request.user
    profile = getattr(user, 'profile', None)
    if not profile:
        return Response({'detail': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)
    serializer = UserMeSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdmin])
def create_user_view(request):
    serializer = UserCreateSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    data = serializer.validated_data
    email = data['email']
    password = data['password']
    role = data['role']
    first_name = data.get('first_name', '')
    last_name = data.get('last_name', '')
    if role == 'admin':
        return Response({'detail': 'Admin creation is not allowed.'}, status=status.HTTP_400_BAD_REQUEST)
    username = email
    try:
        with transaction.atomic():
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name
            )
            Profile.objects.create(user=user, role=role, normalized_email=email.strip().lower())
    except Exception:
        return Response({'detail': 'Failed to create user.'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({
        'id': user.id,
        'email': user.email,
        'role': role,
        'first_name': user.first_name,
        'last_name': user.last_name,
    }, status=status.HTTP_201_CREATED)


ADMIN_APPROVAL_ROLES = ('consultant', 'school')


def approval_payload(profile):
    return {
        'id': profile.user_id,
        'email': profile.user.email,
        'role': profile.role,
        'status': profile.status,
        'first_name': profile.user.first_name,
        'last_name': profile.user.last_name,
    }


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def pending_approvals_view(request):
    """List pending consultant and school accounts awaiting admin approval."""
    profiles = (
        Profile.objects.filter(role__in=ADMIN_APPROVAL_ROLES, status='pending')
        .select_related('user')
        .order_by('id')
    )
    return Response([approval_payload(profile) for profile in profiles], status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdmin])
def review_account_view(request, user_id, action):
    """Approve or reject a pending consultant/school account.

    Only Profile.status is changed. User.is_active is deliberately untouched;
    suspension remains a separate admin action.
    """
    if action not in ('approve', 'reject'):
        return Response({'detail': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        profile = Profile.objects.select_related('user').get(user_id=user_id)
    except Profile.DoesNotExist:
        return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    if profile.role not in ADMIN_APPROVAL_ROLES:
        return Response(
            {'detail': 'Only consultant and school accounts require admin approval.'},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if profile.status != 'pending':
        return Response(
            {'detail': 'This request has already been processed.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    new_status = 'approved' if action == 'approve' else 'rejected'
    with transaction.atomic():
        updated = Profile.objects.filter(pk=profile.pk, status='pending').update(status=new_status)
    if not updated:
        return Response(
            {'detail': 'This request has already been processed.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    profile.refresh_from_db()
    return Response(approval_payload(profile), status=status.HTTP_200_OK)


def link_payload(link):
    child = link.child
    child_profile = getattr(child, 'profile', None)
    return {
        'id': link.id,
        'parent_id': link.parent_id,
        'child_id': link.child_id,
        'child_email': child.email,
        'child_first_name': child.first_name,
        'child_last_name': child.last_name,
        'child_role': child_profile.role if child_profile else None,
        'child_status': child_profile.status if child_profile else None,
        'status': link.status,
        'created_at': link.created_at.isoformat(),
    }


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsParent])
def parent_child_links_view(request):
    """List only the authenticated parent's pending child-link requests."""
    links = (
        ParentChildLink.objects.filter(parent=request.user, status='pending')
        .select_related('child', 'child__profile')
        .order_by('id')
    )
    return Response([link_payload(link) for link in links], status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsParent])
def review_parent_child_link_view(request, link_id, action):
    """Verify or reject a child link owned by the authenticated parent."""
    if action not in ('verify', 'reject'):
        return Response({'detail': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)

    # Ownership is enforced by the query: another parent's link is invisible.
    link = (
        ParentChildLink.objects.filter(pk=link_id, parent=request.user)
        .select_related('child', 'parent')
        .first()
    )
    if not link:
        return Response({'detail': 'Link request not found.'}, status=status.HTTP_404_NOT_FOUND)

    parent_profile = getattr(request.user, 'profile', None)
    child_profile = getattr(link.child, 'profile', None)
    if not parent_profile or parent_profile.role != 'parent':
        return Response({'detail': 'Only a parent can review this link.'}, status=status.HTTP_400_BAD_REQUEST)
    if not child_profile or child_profile.role != 'child':
        return Response({'detail': 'Linked account is not a child.'}, status=status.HTTP_400_BAD_REQUEST)
    if link.status != 'pending':
        return Response(
            {'detail': 'This link has already been processed.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    new_link_status = 'verified' if action == 'verify' else 'rejected'
    with transaction.atomic():
        updated = ParentChildLink.objects.filter(pk=link.pk, status='pending').update(status=new_link_status)
        if not updated:
            return Response(
                {'detail': 'This link has already been processed.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if action == 'verify':
            # A verified link approves the child account. is_active is untouched.
            # Rejection leaves the child profile in its pending state.
            Profile.objects.filter(user_id=link.child_id, role='child').update(status='approved')

    link.refresh_from_db()
    child_profile.refresh_from_db()
    return Response(link_payload(link), status=status.HTTP_200_OK)

