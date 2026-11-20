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

    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    normalized_email = models.EmailField(max_length=254, unique=True, db_index=True, null=True, blank=True)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending',
        db_index=True,
    )

    def __str__(self):
        return f"{self.user.username} - {self.role}"


class ParentChildLink(models.Model):
    LINK_STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('verified', 'Verified'),
        ('rejected', 'Rejected'),
    )

    parent = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='child_links'
    )
    child = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='parent_links'
    )
    status = models.CharField(
        max_length=10,
        choices=LINK_STATUS_CHOICES,
        default='pending',
        db_index=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['parent', 'child'],
                name='unique_parent_child_link',
            ),
        ]

    def __str__(self):
        return f"{self.parent.username} -> {self.child.username} ({self.status})"

