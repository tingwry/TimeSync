from .models import UserInfo, Schedule, Location
from rest_framework import serializers

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'

    # event_id = models.AutoField(primary_key=True)
    # event_name = models.CharField(max_length=100)
    # date = models.DateField()
    # start_time = models.TimeField()
    # end_time = models.TimeField()
    # transportation_mode = models.CharField(
    #     max_length=20, choices=transportation_mode_choices)
    # extra_prep_time = models.IntegerField()
    # note = models.TextField()

    # uid = models.ForeignKey(
    #     UserInfo, on_delete=models.CASCADE, related_name='schedules')
    # # user_id = models.ForeignKey(
    # #     UserInfo, on_delete=models.CASCADE, related_name='schedules')
    # sched_start = models.ForeignKey(
    #     'Location', on_delete=models.CASCADE, related_name='start_locations')
    # sched_destination = models.ForeignKey(
    #     'Location', on_delete=models.CASCADE, related_name='destination_locations')
    # wake_up_aids = models.ForeignKey(
    #     UserInfo, on_delete=models.CASCADE, related_name='wake_up_friends')
    # # prep_activities = models.ManyToManyField('PrepActivityTime')

    def create(self, validated_data):
        # Extract foreign key IDs from validated data
        sched_start_id = validated_data.pop('sched_start')
        sched_destination_id = validated_data.pop('sched_destination')
        wake_up_aids_id = validated_data.pop('wake_up_aids')

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
