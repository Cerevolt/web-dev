from rest_framework import serializers
from django.contrib.auth.models import User

from .models import AdminActivityLog, SystemSetting


class AdminActivityLogSerializer(serializers.ModelSerializer):
    admin_user_email = serializers.EmailField(source='admin_user.email', read_only=True)
    target_user_email = serializers.EmailField(source='target_user.email', read_only=True)
    admin_user_id = serializers.IntegerField(source='admin_user.id', read_only=True)
    target_user_id = serializers.IntegerField(source='target_user.id', read_only=True)

    class Meta:
        model = AdminActivityLog
        fields = [
            'id',
            'admin_user',
            'admin_user_id',
            'admin_user_email',
            'target_user',
            'target_user_id',
            'target_user_email',
            'action',
            'description',
            'ip_address',
            'timestamp',
        ]
        read_only_fields = ['id', 'timestamp']


class SystemSettingSerializer(serializers.ModelSerializer):
    updated_by_email = serializers.EmailField(source='updated_by.email', read_only=True)
    updated_by_id = serializers.IntegerField(source='updated_by.id', read_only=True)

    class Meta:
        model = SystemSetting
        fields = [
            'id',
            'key',
            'value',
            'description',
            'updated_by',
            'updated_by_id',
            'updated_by_email',
            'updated_at',
        ]
        read_only_fields = ['id', 'updated_at']
