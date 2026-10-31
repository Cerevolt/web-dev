from django.contrib.auth.models import User
from django.db import transaction
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .models import Profile
from .permissions import IsAdmin
from .serializers import UserCreateSerializer, UserMeSerializer


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
        if token_user_id != request.user.pk:
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

