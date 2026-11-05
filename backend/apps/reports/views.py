from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.accounts.permissions import IsAdmin
from apps.accounts.models import Profile
from apps.school.models import School, Class, StudentEnrollment
from apps.children.models import Video, Game, Reward, DailyGoal
from apps.consultant.models import Assessment, ProgressData
from apps.parents.models import Feedback, DoctorSupportRequest


@api_view(['GET'])
@permission_classes([IsAdmin])
def admin_overview_report(request):
    total_users = User.objects.count()
    active_users = User.objects.filter(is_active=True).count()
    inactive_users = User.objects.filter(is_active=False).count()

    users_by_role = (
        Profile.objects.values('role')
        .annotate(count=Count('role'))
        .order_by('role')
    )
    role_counts = {item['role']: item['count'] for item in users_by_role}

    total_schools = School.objects.count()
    total_classes = Class.objects.count()

    total_enrollments = StudentEnrollment.objects.count()
    active_enrollments = StudentEnrollment.objects.filter(is_active=True).count()
    inactive_enrollments = StudentEnrollment.objects.filter(is_active=False).count()

    content_stats = {
        'children': {
            'videos': Video.objects.count(),
            'games': Game.objects.count(),
            'rewards': Reward.objects.count(),
            'dailygoals': DailyGoal.objects.count(),
        },
        'consultant': {
            'assessments': Assessment.objects.count(),
            'progress_data': ProgressData.objects.count(),
        },
        'parents': {
            'feedbacks': Feedback.objects.count(),
            'doctor_support_requests': DoctorSupportRequest.objects.count(),
        },
    }

    data = {
        'users': {
            'total': total_users,
            'active': active_users,
            'inactive': inactive_users,
            'by_role': role_counts,
        },
        'schools': {
            'total_schools': total_schools,
            'total_classes': total_classes,
        },
        'enrollments': {
            'total': total_enrollments,
            'active': active_enrollments,
            'inactive': inactive_enrollments,
        },
        'content': content_stats,
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def school_summary_report(request):
    user = request.user
    profile = getattr(user, 'profile', None)

    if not profile:
        return Response({'detail': 'Profile not found.'}, status=status.HTTP_403_FORBIDDEN)

    if profile.role == 'admin' and user.is_superuser:
        total_schools = School.objects.count()
        total_classes = Class.objects.count()
        total_enrollments = StudentEnrollment.objects.count()
        active_enrollments = StudentEnrollment.objects.filter(is_active=True).count()
        inactive_enrollments = StudentEnrollment.objects.filter(is_active=False).count()

        class_wise = (
            Class.objects.select_related('school')
            .annotate(enrollment_count=Count('student_enrollments'))
            .values('id', 'name', 'grade', 'school_id', 'school__name', 'enrollment_count')
            .order_by('school_id', 'id')
        )

        data = {
            'scope': 'all_schools',
            'total_schools': total_schools,
            'total_classes': total_classes,
            'total_enrollments': total_enrollments,
            'active_enrollments': active_enrollments,
            'inactive_enrollments': inactive_enrollments,
            'class_wise_enrollments': list(class_wise),
        }
        return Response(data, status=status.HTTP_200_OK)

    if profile.role == 'school':
        try:
            school = School.objects.get(owner=user)
        except School.DoesNotExist:
            return Response({'detail': 'No school assigned to this user.'}, status=status.HTTP_404_NOT_FOUND)

        total_classes = Class.objects.filter(school=school).count()
        total_enrollments = StudentEnrollment.objects.filter(school=school).count()
        active_enrollments = StudentEnrollment.objects.filter(school=school, is_active=True).count()
        inactive_enrollments = StudentEnrollment.objects.filter(school=school, is_active=False).count()

        class_wise = (
            Class.objects.filter(school=school)
            .annotate(enrollment_count=Count('student_enrollments'))
            .values('id', 'name', 'grade', 'enrollment_count')
            .order_by('id')
        )

        data = {
            'scope': 'school',
            'school': {
                'id': school.id,
                'name': school.name,
            },
            'total_classes': total_classes,
            'total_enrollments': total_enrollments,
            'active_enrollments': active_enrollments,
            'inactive_enrollments': inactive_enrollments,
            'class_wise_enrollments': list(class_wise),
        }
        return Response(data, status=status.HTTP_200_OK)

    return Response({'detail': 'Only admin or school users are allowed.'}, status=status.HTTP_403_FORBIDDEN)
