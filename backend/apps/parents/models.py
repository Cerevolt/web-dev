from django.db import models
class Feedback(models.Model):

    parent_name = models.CharField(max_length=100)

    message = models.TextField()

    def __str__(self):
        return self.parent_name
class DoctorSupportRequest(models.Model):

    parent_name = models.CharField(max_length=100)

    issue = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.parent_name
