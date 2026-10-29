from rest_framework import serializers
from .models import Feedback, DoctorSupportRequest


class FeedbackSerializer(serializers.ModelSerializer):

    class Meta:
        model = Feedback
        fields = '__all__'


class DoctorSupportRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = DoctorSupportRequest
        fields = '__all__'