from django.urls import path
from .views import (
    admin_dashboard,
    admin_user_list,
    admin_user_detail,
    admin_user_update,
    admin_user_activate_deactivate,
)

urlpatterns = [
    path('dashboard/', admin_dashboard, name='admin-dashboard'),
    path('users/', admin_user_list, name='admin-user-list'),
    path('users/<int:user_id>/', admin_user_detail, name='admin-user-detail'),
    path('users/<int:user_id>/update/', admin_user_update, name='admin-user-update'),
    path('users/<int:user_id>/status/', admin_user_activate_deactivate, name='admin-user-status'),
]

