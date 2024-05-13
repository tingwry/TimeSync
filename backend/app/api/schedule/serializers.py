from rest_framework import serializers
from ...models import UserAuth, UserInfo, Schedule, Location
from datetime import datetime

class ScheduleSerializer(serializers.ModelSerializer):
    uid = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Schedule
        fields = '__all__'
    
    def create(self, validated_data):
        sched_start_id = validated_data.pop('sched_start', None)
        sched_destination_id = validated_data.pop('sched_destination', None)
        wake_up_aids_id = validated_data.pop('wake_up_aids', None)

        if sched_start_id is None:
            sched_start_id = Location.objects.filter(default_home=True).first()
        if sched_destination_id is None:
            sched_destination_id = Location.objects.filter(default_dest=True).first()
        if wake_up_aids_id is None:
            wake_up_aids_id = UserInfo.objects.first()

        # Retrieve Location and UserInfo instances using IDs
        sched_start = Location.objects.get(pk=sched_start_id.loc_id)
        sched_destination = Location.objects.get(pk=sched_destination_id.loc_id)
        wake_up_aids = UserInfo.objects.get(pk=wake_up_aids_id.uid)

        # Create Schedule instance with associated objects
        schedule = Schedule.objects.create(
            sched_start=sched_start,
            sched_destination=sched_destination,
            wake_up_aids=wake_up_aids,
            **validated_data
        )
        return schedule