# Generated data migration to assign admin role to existing superuser

from django.db import migrations


def assign_admin_to_superuser(apps, schema_editor):
    User = apps.get_model('auth', 'User')
    Profile = apps.get_model('accounts', 'Profile')
    for user in User.objects.filter(is_superuser=True):
        Profile.objects.get_or_create(user=user, defaults={'role': 'admin'})


def reverse_assign(apps, schema_editor):
    # Do not remove profiles on reverse to be safe
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(assign_admin_to_superuser, reverse_assign),
    ]
