from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.conf import settings

from .models import ChatSession, ChatMessage
from .serializer import ChatSessionSerializer, SendMessageSerializer
from .services.llm import generate_chat_response


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def sessions(request):
    if request.method == 'POST':
        title = request.data.get('title')
        session = ChatSession.objects.create(user=request.user, title=title)
        serializer = ChatSessionSerializer(session)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        sessions = ChatSession.objects.filter(user=request.user)
        serializer = ChatSessionSerializer(sessions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


create_session = sessions
list_sessions = sessions


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request, pk):
    try:
        session = ChatSession.objects.get(pk=pk, user=request.user)
    except ChatSession.DoesNotExist:
        return Response({'detail': 'Session not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = SendMessageSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    message = serializer.validated_data['message']

    # Check configuration
    if not getattr(settings, 'GEMINI_API_KEY', None):
        return Response({'detail': 'Chatbot not configured.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

    # Get history (last N messages)
    history_qs = ChatMessage.objects.filter(session=session).order_by('created_at')[:20]
    history = []
    for msg in history_qs:
        history.append({'role': msg.role, 'content': msg.content})

    # Save user message
    user_msg = ChatMessage.objects.create(session=session, role='user', content=message)

    # Generate response
    result = generate_chat_response(message, history=history)

    if not result.get('success'):
        return Response({'detail': 'Unable to generate response.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

    assistant_content = result.get('content')
    if not assistant_content:
        return Response({'detail': 'Unable to generate response.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

    assistant_msg = ChatMessage.objects.create(session=session, role='assistant', content=assistant_content)

    # Update session timestamp
    session.save(update_fields=['updated_at'])

    return Response({
        'session_id': session.id,
        'user_message': {
            'id': user_msg.id,
            'content': user_msg.content,
            'created_at': user_msg.created_at,
        },
        'assistant_message': {
            'id': assistant_msg.id,
            'content': assistant_msg.content,
            'created_at': assistant_msg.created_at,
        }
    }, status=status.HTTP_200_OK)
