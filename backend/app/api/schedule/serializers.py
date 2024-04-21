from rest_framework import serializers
from ...models import UserAuth, UserInfo, Schedule, Location
from datetime import datetime

# class CustomTimeField(serializers.Field):
#     def to_internal_value(self, data):
#         try:
#             # Parse the time string into a datetime object
#             time_obj = datetime.strptime(data, '%H:%M')
#             # Return the time as a string in the format HH:MM
#             return time_obj.strftime('%H:%M')
#         except ValueError:
#             raise serializers.ValidationError('Invalid time format. Use HH:MM.')

#     def to_representation(self, value):
#         return value.strftime('%H:%M')

class ScheduleSerializer(serializers.ModelSerializer):
    uid = serializers.PrimaryKeyRelatedField(read_only=True)
    # start_time = CustomTimeField()
    # end_time = CustomTimeField()

    class Meta:
        model = Schedule
        fields = '__all__'

    def create(self, validated_data):
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