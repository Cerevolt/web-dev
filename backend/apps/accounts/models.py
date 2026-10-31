from django.conf import settings
from django.db import models


class Profile(models.Model):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('parent', 'Parent'),
        ('consultant', 'Consultant'),
        ('school', 'School'),
        ('child', 'Child'),
    )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    normalized_email = models.EmailField(max_length=254, unique=True, db_index=True, null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.role}"

