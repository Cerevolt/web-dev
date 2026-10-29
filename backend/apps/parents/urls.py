from django.urls import path
from .views import feedback_list, doctor_request_list

urlpatterns = [

    path('feedbacks/', feedback_list),

    path('doctor-requests/', doctor_request_list),

]