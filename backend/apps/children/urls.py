from django.urls import path

from .views import (
    video_list,
    game_list,
    reward_list,
    dailygoal_list
)

urlpatterns = [

    path('videos/', video_list),

    path('games/', game_list),

    path('rewards/', reward_list),

    path('dailygoals/', dailygoal_list),

]