from rest_framework import serializers
from django.contrib.auth.models import User

from .models import School, Class, StudentEnrollment


class SchoolSerializer(serializers.ModelSerializer):
    owner_username = serializers.CharField(source='owner.username', read_only=True)
    owner_email = serializers.EmailField(source='owner.email', read_only=True)

    class Meta:
        model = School
        fields = [
            'id',
            'owner',
            'owner_username',
            'owner_email',
            'name',
            'address',
            'contact_email',
            'contact_phone',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'owner', 'created_at', 'updated_at']

    def create(self, validated_data):
        # owner must be set by view/permission logic
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['owner'] = request.user
        return super().create(validated_data)


class ClassSerializer(serializers.ModelSerializer):
    school_name = serializers.CharField(source='school.name', read_only=True)

    class Meta:
        model = Class
        fields = [
            'id',
            'school',
            'school_name',
            'name',
            'grade',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']



    def validate(self, attrs):
        school = attrs.get('school') if 'school' in attrs else getattr(self.instance, 'school', None)
        name = attrs.get('name') if 'name' in attrs else getattr(self.instance, 'name', None)
        grade = attrs.get('grade') if 'grade' in attrs else getattr(self.instance, 'grade', None)

        if school and name and grade:
            qs = Class.objects.filter(school=school, grade=grade, name=name)
            if self.instance:
                qs = qs.exclude(pk=self.instance.pk)
            if qs.exists():
                raise serializers.ValidationError('A class with this name and grade already exists in this school.')

        return attrs


class EnrollmentSerializer(serializers.ModelSerializer):
    student_username = serializers.CharField(source='student.username', read_only=True)
    school_name = serializers.CharField(source='school.name', read_only=True)
    class_name = serializers.CharField(source='class_assigned.name', read_only=True)
    class_grade = serializers.CharField(source='class_assigned.grade', read_only=True)

    class Meta:
        model = StudentEnrollment
        fields = [
            'id',
            'student',
            'student_username',
            'school',
            'school_name',
            'class_assigned',
            'class_name',
            'class_grade',
            'enrolled_at',
            'is_active',
        ]
        read_only_fields = ['id', 'school', 'enrolled_at']

    def validate(self, attrs):
        student = attrs.get('student') if 'student' in attrs else getattr(self.instance, 'student', None)
        class_assigned = attrs.get('class_assigned') if 'class_assigned' in attrs else getattr(self.instance, 'class_assigned', None)
        school = attrs.get('school') if 'school' in attrs else getattr(self.instance, 'school', None)

        if student:
            profile = getattr(student, 'profile', None)
            if not profile or profile.role != 'child':
                raise serializers.ValidationError('Student must have a profile with role child.')

        if class_assigned and school:
            if class_assigned.school_id != school.id:
                raise serializers.ValidationError('Class must belong to the selected school.')

        if student and attrs.get('is_active', True) and not self.instance:
            if StudentEnrollment.objects.filter(student=student, is_active=True).exists():
                raise serializers.ValidationError('Student already has an active enrollment.')
        elif student and attrs.get('is_active', True) and self.instance and not self.instance.is_active:
            if StudentEnrollment.objects.filter(student=student, is_active=True).exclude(pk=self.instance.pk).exists():
                raise serializers.ValidationError('Student already has an active enrollment.')

        return attrs

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            profile = getattr(request.user, 'profile', None)
            if profile and profile.role == 'school':
                school = School.objects.filter(owner=request.user).first()
                if school:
                    validated_data['school'] = school
        return super().create(validated_data)


