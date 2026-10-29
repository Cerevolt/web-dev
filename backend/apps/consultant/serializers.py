from rest_framework import serializers
from .models import Assessment, ProgressData


class AssessmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Assessment
        fields = '__all__'


class ProgressDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProgressData
        fields = '__all__'