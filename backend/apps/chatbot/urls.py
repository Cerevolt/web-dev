from django.urls import path
from .views import sessions, send_message

urlpatterns = [
    path('sessions/', sessions, name='chatbot-sessions'),
    path('sessions/<int:pk>/messages/', send_message, name='chatbot-send-message'),
]
