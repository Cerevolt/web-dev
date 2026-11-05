from django.urls import path
from .views import school_dashboard, class_list_create, class_detail, enrollment_list_create, enrollment_detail, enrollment_deactivate

urlpatterns = [
    path('dashboard/', school_dashboard, name='school-dashboard'),
    path('classes/', class_list_create, name='school-classes-list-create'),
    path('classes/<int:pk>/', class_detail, name='school-class-detail'),
    path('enrollments/', enrollment_list_create, name='school-enrollments-list-create'),
    path('enrollments/<int:pk>/', enrollment_detail, name='school-enrollment-detail'),
    path('enrollments/<int:pk>/deactivate/', enrollment_deactivate, name='school-enrollment-deactivate'),
]


