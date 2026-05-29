from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Video, Game, Reward, DailyGoal

from .serializers import (
    VideoSerializer,
    GameSerializer,
    RewardSerializer,
    DailyGoalSerializer
)


@api_view(['GET'])
def video_list(request):

    videos = Video.objects.all()

    serializer = VideoSerializer(videos, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def game_list(request):

    games = Game.objects.all()

    serializer = GameSerializer(games, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def reward_list(request):

    rewards = Reward.objects.all()

    serializer = RewardSerializer(rewards, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def dailygoal_list(request):

    goals = DailyGoal.objects.all()

    serializer = DailyGoalSerializer(goals, many=True)

    return Response(serializer.data)