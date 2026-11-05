from django.urls import path
from .views import admin_overview_report, school_summary_report

urlpatterns = [
    path('admin/overview/', admin_overview_report, name='reports-admin-overview'),
    path('school/summary/', school_summary_report, name='reports-school-summary'),
]

