from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Feedback, DoctorSupportRequest

from .serializers import (
    FeedbackSerializer,
    DoctorSupportRequestSerializer
)


@api_view(['GET'])
def feedback_list(request):

    feedbacks = Feedback.objects.all()

    serializer = FeedbackSerializer(feedbacks, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def doctor_request_list(request):

    requests = DoctorSupportRequest.objects.all()

    serializer = DoctorSupportRequestSerializer(requests, many=True)

    return Response(serializer.data)