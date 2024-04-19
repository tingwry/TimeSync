from .models import UserAuth, UserInfo, Schedule, Location
from rest_framework import serializers

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    uid = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Schedule
        fields = '__all__'

    def create(self, validated_data):
        # Extract foreign key IDs from validated data
        # uid = self.context['request'].user
        
        sched_start_id = validated_data.pop('sched_start').loc_id
        sched_destination_id = validated_data.pop('sched_destination').loc_id
        wake_up_aids_id = validated_data.pop('wake_up_aids').uid

        # Retrieve Location and UserInfo instances using IDs
        sched_start = Location.objects.get(pk=sched_start_id)
        sched_destination = Location.objects.get(pk=sched_destination_id)
        wake_up_aids = UserInfo.objects.get(pk=wake_up_aids_id)

        # Create Schedule instance with associated objects
        schedule = Schedule.objects.create(
            sched_start=sched_start,
            sched_destination=sched_destination,
            wake_up_aids=wake_up_aids,
            **validated_data
        )
        return schedule

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'
