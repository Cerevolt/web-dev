from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.accounts.permissions import IsAdmin
from .models import School, Class, StudentEnrollment
from .serializer import SchoolSerializer, ClassSerializer, EnrollmentSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def school_dashboard(request):
    user = request.user
    profile = getattr(user, 'profile', None)

    if profile and profile.role == 'admin' and user.is_superuser:
        schools = School.objects.all()
        data = []
        for school in schools:
            class_count = school.classes.count()
            data.append({
                'school': SchoolSerializer(school).data,
                'class_count': class_count,
            })
        return Response({'schools': data, 'total_schools': len(data)}, status=status.HTTP_200_OK)

    if profile and profile.role == 'school':
        try:
            school = School.objects.get(owner=user)
        except School.DoesNotExist:
            return Response({'detail': 'No school assigned to this user.'}, status=status.HTTP_404_NOT_FOUND)

        class_count = school.classes.count()
        classes = school.classes.all()
        class_data = []
        for cls in classes:
            class_data.append({
                'id': cls.id,
                'name': cls.name,
                'grade': cls.grade,
            })

        return Response({
            'school': SchoolSerializer(school).data,
            'class_count': class_count,
            'classes': class_data,
        }, status=status.HTTP_200_OK)

    return Response({'detail': 'Only admin or school users are allowed.'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def class_list_create(request):
    user = request.user
    profile = getattr(user, 'profile', None)

    if profile and profile.role == 'admin' and user.is_superuser:
        if request.method == 'GET':
            classes = Class.objects.select_related('school').all()
            serializer = ClassSerializer(classes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method == 'POST':
            serializer = ClassSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif profile and profile.role == 'school':
        try:
            school = School.objects.get(owner=user)
        except School.DoesNotExist:
            return Response({'detail': 'No school assigned to this user.'}, status=status.HTTP_404_NOT_FOUND)
        if request.method == 'GET':
            classes = Class.objects.filter(school=school)
            serializer = ClassSerializer(classes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method == 'POST':
            data = request.data.copy()
            data['school'] = school.id
            serializer = ClassSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'detail': 'Only admin or school users are allowed.'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PATCH', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def class_detail(request, pk):
    user = request.user
    profile = getattr(user, 'profile', None)

    try:
        cls = Class.objects.select_related('school').get(pk=pk)
    except Class.DoesNotExist:
        return Response({'detail': 'Class not found.'}, status=status.HTTP_404_NOT_FOUND)

    if profile and profile.role == 'admin' and user.is_superuser:
        if request.method == 'GET':
            serializer = ClassSerializer(cls)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method in ['PATCH', 'PUT']:
            serializer = ClassSerializer(cls, data=request.data, partial=(request.method == 'PATCH'))
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            cls.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    elif profile and profile.role == 'school':
        try:
            school = School.objects.get(owner=user)
        except School.DoesNotExist:
            return Response({'detail': 'No school assigned to this user.'}, status=status.HTTP_404_NOT_FOUND)
        if cls.school != school:
            return Response({'detail': 'You do not have permission to access this class.'}, status=status.HTTP_403_FORBIDDEN)
        if request.method == 'GET':
            serializer = ClassSerializer(cls)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method in ['PATCH', 'PUT']:
            data = request.data.copy()
            data['school'] = school.id
            serializer = ClassSerializer(cls, data=data, partial=(request.method == 'PATCH'))
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            cls.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    return Response({'detail': 'Only admin or school users are allowed.'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def enrollment_list_create(request):
    user = request.user
    profile = getattr(user, 'profile', None)

    if profile and profile.role == 'admin' and user.is_superuser:
        if request.method == 'GET':
            enrollments = StudentEnrollment.objects.select_related('student', 'school', 'class_assigned').all()
            serializer = EnrollmentSerializer(enrollments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method == 'POST':
            serializer = EnrollmentSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                try:
                    enrollment = serializer.save()
                    return Response(EnrollmentSerializer(enrollment).data, status=status.HTTP_201_CREATED)
                except Exception as e:
                    return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif profile and profile.role == 'school':
        try:
            school = School.objects.get(owner=user)
        except School.DoesNotExist:
            return Response({'detail': 'No school assigned to this user.'}, status=status.HTTP_404_NOT_FOUND)
        if request.method == 'GET':
            enrollments = StudentEnrollment.objects.filter(school=school).select_related('student', 'school', 'class_assigned')
            serializer = EnrollmentSerializer(enrollments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method == 'POST':
            data = request.data.copy()
            data['school'] = school.id
            serializer = EnrollmentSerializer(data=data, context={'request': request})
            if serializer.is_valid():
                try:
                    enrollment = serializer.save()
                    return Response(EnrollmentSerializer(enrollment).data, status=status.HTTP_201_CREATED)
                except Exception as e:
                    return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'detail': 'Only admin or school users are allowed.'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PATCH', 'PUT'])
@permission_classes([IsAuthenticated])
def enrollment_detail(request, pk):
    user = request.user
    profile = getattr(user, 'profile', None)

    try:
        enrollment = StudentEnrollment.objects.select_related('student', 'school', 'class_assigned').get(pk=pk)
    except StudentEnrollment.DoesNotExist:
        return Response({'detail': 'Enrollment not found.'}, status=status.HTTP_404_NOT_FOUND)

    if profile and profile.role == 'admin' and user.is_superuser:
        if request.method == 'GET':
            serializer = EnrollmentSerializer(enrollment)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method in ['PATCH', 'PUT']:
            data = request.data.copy()
            data.pop('student', None)
            data.pop('school', None)
            serializer = EnrollmentSerializer(enrollment, data=data, partial=(request.method == 'PATCH'), context={'request': request})
            if serializer.is_valid():
                try:
                    enrollment = serializer.save()
                    return Response(EnrollmentSerializer(enrollment).data, status=status.HTTP_200_OK)
                except Exception as e:
                    return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif profile and profile.role == 'school':
        try:
            school = School.objects.get(owner=user)
        except School.DoesNotExist:
            return Response({'detail': 'No school assigned to this user.'}, status=status.HTTP_404_NOT_FOUND)
        if enrollment.school != school:
            return Response({'detail': 'You do not have permission to access this enrollment.'}, status=status.HTTP_403_FORBIDDEN)
        if request.method == 'GET':
            serializer = EnrollmentSerializer(enrollment)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method in ['PATCH', 'PUT']:
            data = request.data.copy()
            data.pop('student', None)
            data.pop('school', None)
            serializer = EnrollmentSerializer(enrollment, data=data, partial=(request.method == 'PATCH'), context={'request': request})
            if serializer.is_valid():
                try:
                    enrollment = serializer.save()
                    return Response(EnrollmentSerializer(enrollment).data, status=status.HTTP_200_OK)
                except Exception as e:
                    return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'detail': 'Only admin or school users are allowed.'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enrollment_deactivate(request, pk):
    user = request.user
    profile = getattr(user, 'profile', None)

    try:
        enrollment = StudentEnrollment.objects.get(pk=pk)
    except StudentEnrollment.DoesNotExist:
        return Response({'detail': 'Enrollment not found.'}, status=status.HTTP_404_NOT_FOUND)

    if profile and profile.role == 'admin' and user.is_superuser:
        enrollment.is_active = False
        enrollment.save()
        return Response({'detail': 'Enrollment deactivated.'}, status=status.HTTP_200_OK)
    elif profile and profile.role == 'school':
        try:
            school = School.objects.get(owner=user)
        except School.DoesNotExist:
            return Response({'detail': 'No school assigned to this user.'}, status=status.HTTP_404_NOT_FOUND)
        if enrollment.school != school:
            return Response({'detail': 'You do not have permission to access this enrollment.'}, status=status.HTTP_403_FORBIDDEN)
        enrollment.is_active = False
        enrollment.save()
        return Response({'detail': 'Enrollment deactivated.'}, status=status.HTTP_200_OK)
    return Response({'detail': 'Only admin or school users are allowed.'}, status=status.HTTP_403_FORBIDDEN)
