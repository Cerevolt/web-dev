from rest_framework import serializers
from .models import Video, Game, Reward, DailyGoal


class VideoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Video
        fields = '__all__'


class GameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Game
        fields = '__all__'


class RewardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reward
        fields = '__all__'


class DailyGoalSerializer(serializers.ModelSerializer):

    class Meta:
        model = DailyGoal
        fields = '__all__'