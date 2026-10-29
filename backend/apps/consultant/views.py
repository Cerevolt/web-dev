from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Assessment,ProgressData

from .serializers import (
    AssessmentSerializer,
    ProgressDataSerializer
)


@api_view(['GET'])
def assessment_list(request):

    assessments = Assessment.objects.all()

    serializer = AssessmentSerializer(assessments, many=True)

    return Response(serializer.data)
@api_view(['GET'])
def progress_list(request):

    progress = ProgressData.objects.all()

    serializer = ProgressDataSerializer(progress, many=True)

    return Response(serializer.data)