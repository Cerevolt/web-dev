from django.db import models

class Assessment(models.Model):

    child_name = models.CharField(max_length=100)

    notes = models.TextField()

    def __str__(self):
        return self.child_name
class ProgressData(models.Model):

    child_name = models.CharField(max_length=100)

    progress = models.TextField()

    def __str__(self):
        return self.child_name
