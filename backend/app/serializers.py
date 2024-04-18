from .models import UserInfo, Schedule, Location, TotalPrepTime
from rest_framework import serializers


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = '__all__'


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class TotalPrepTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TotalPrepTime
        fields = '__all__'
