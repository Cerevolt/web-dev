from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


def approve_existing_profiles(apps, schema_editor):
    """Preserve access for accounts that existed before approval status was added.

    Every pre-existing profile is marked 'approved' so current users keep the
    access they had before this migration. Only rows that already exist at this
    point are affected; new profiles use the model default of 'pending'.
    """
    Profile = apps.get_model('accounts', 'Profile')
    Profile.objects.all().update(status='approved')


def reverse_approve_existing_profiles(apps, schema_editor):
    """Intentionally a no-op.

    Reversing this migration removes the 'status' column entirely (the AddField
    operation is reversed after this RunPython). Resetting statuses here would
    only discard approval information and could lock users out if the reverse
    is ever run partially. Leaving the data untouched is the safe behavior.
    """
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_profile_normalized_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='status',
            field=models.CharField(
                choices=[
                    ('pending', 'Pending'),
                    ('approved', 'Approved'),
                    ('rejected', 'Rejected'),
                ],
                db_index=True,
                default='pending',
                max_length=10,
            ),
        ),
        migrations.RunPython(
            approve_existing_profiles,
            reverse_approve_existing_profiles,
        ),
        migrations.CreateModel(
            name='ParentChildLink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(
                    choices=[
                        ('pending', 'Pending'),
                        ('verified', 'Verified'),
                        ('rejected', 'Rejected'),
                    ],
                    db_index=True,
                    default='pending',
                    max_length=10,
                )),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('child', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='parent_links',
                    to=settings.AUTH_USER_MODEL,
                )),
                ('parent', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='child_links',
                    to=settings.AUTH_USER_MODEL,
                )),
            ],
            options={
                'constraints': [
                    models.UniqueConstraint(
                        fields=('parent', 'child'),
                        name='unique_parent_child_link',
                    ),
                ],
            },
        ),
    ]
