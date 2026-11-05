from django.contrib import admin
from .models import School, Class, StudentEnrollment


@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'contact_email', 'contact_phone', 'created_at')
    search_fields = ('name', 'owner__username', 'contact_email')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    list_display = ('name', 'grade', 'school', 'created_at')
    list_filter = ('school', 'grade')
    search_fields = ('name', 'grade', 'school__name')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(StudentEnrollment)
class StudentEnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'school', 'class_assigned', 'is_active', 'enrolled_at')
    list_filter = ('school', 'class_assigned', 'is_active')
    search_fields = ('student__username',)
    readonly_fields = ('enrolled_at',)

