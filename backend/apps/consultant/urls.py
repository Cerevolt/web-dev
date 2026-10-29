from django.urls import path

from .views import assessment_list, progress_list

urlpatterns = [
    path('assessments/', assessment_list),
    path('progress/', progress_list),
]