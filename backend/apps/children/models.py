from django.db import models

class Video(models.Model):

    title = models.CharField(max_length=200)

    video_file = models.FileField(upload_to='videos/')

    def __str__(self):
        return self.title
class Game(models.Model):

    name = models.CharField(max_length=100)

    description = models.TextField()

    def __str__(self):
        return self.name
class Reward(models.Model):

    child_name = models.CharField(max_length=100)

    points = models.IntegerField(default=0)

    def __str__(self):
        return self.child_name
class DailyGoal(models.Model):

    goal = models.CharField(max_length=255)

    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.goal