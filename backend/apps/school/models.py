from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Q


class School(models.Model):
    owner = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='owned_school'
    )
    name = models.CharField(max_length=200)
    address = models.TextField(blank=True)
    contact_email = models.EmailField(blank=True)
    contact_phone = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['name']),
        ]

    def __str__(self):
        return self.name


class Class(models.Model):
    school = models.ForeignKey(
        School,
        on_delete=models.CASCADE,
        related_name='classes'
    )
    name = models.CharField(max_length=100)
    grade = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['school', 'grade', 'name'],
                name='unique_grade_class_per_school'
            ),
        ]
        indexes = [
            models.Index(fields=['school', 'grade']),
            models.Index(fields=['school', 'name']),
        ]


    def __str__(self):
        return f"{self.school.name} - {self.grade} {self.name}"


class StudentEnrollment(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='student_enrollments'
    )
    school = models.ForeignKey(
        School,
        on_delete=models.CASCADE,
        related_name='student_enrollments'
    )
    class_assigned = models.ForeignKey(
        Class,
        on_delete=models.CASCADE,
        related_name='student_enrollments'
    )
    enrolled_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['student'],
                condition=Q(is_active=True),
                name='unique_active_enrollment_per_student'
            ),
        ]
        indexes = [
            models.Index(fields=['student', 'is_active']),
            models.Index(fields=['school', 'class_assigned']),
        ]

    def clean(self):
        profile = getattr(self.student, 'profile', None)
        if not profile or profile.role != 'child':
            raise ValidationError('Student must have a profile with role child.')
        if self.class_assigned.school_id != self.school_id:
            raise ValidationError('Class must belong to the selected school.')

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.student.username} - {self.school.name} - {self.class_assigned}"

