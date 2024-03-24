from django.db import models
import uuid

transportation_mode_choices = [
    ('car', 'Car'),
    ('motorcycle', 'Motorcycle'),
    ('bus', 'Bus'),
    ('metro', 'Metro'),
    ('walk', 'Walk')
]

# Create your models here.


class UserInfo(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    alarm_sound = models.CharField(max_length=100)
    sched_reminder = models.BooleanField(default=True)
    departure_time = models.BooleanField(default=True)
    new_friends = models.BooleanField(default=True)
    wake_up_aids_requests = models.BooleanField(default=True)
    phone_number = models.CharField(max_length=24)
    total_prep_time = models.IntegerField(default=0)

    def __str__(self):
        return self.username


class UserAuth(models.Model):
    email = models.EmailField()
    password = models.CharField(max_length=100)

    user_id = models.OneToOneField(
        UserInfo, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return self.email


class Schedule(models.Model):
    event_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event_name = models.CharField(max_length=100)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    transportation_mode = models.CharField(
        max_length=20, choices=transportation_mode_choices)
    extra_prep_time = models.IntegerField()
    note = models.TextField()

    user_id = models.ForeignKey(
        UserInfo, on_delete=models.CASCADE, related_name='schedules')
    sched_start = models.ForeignKey(
        'Location', on_delete=models.CASCADE, related_name='start_locations')
    sched_destination = models.ForeignKey(
        'Location', on_delete=models.CASCADE, related_name='destination_locations')
    wake_up_aids = models.ForeignKey(
        UserInfo, on_delete=models.CASCADE, related_name='wake_up_friends')
    # prep_activities = models.ManyToManyField('PrepActivityTime')

    def __str__(self):
        return self.event_name


class Location(models.Model):
    loc_id = models.AutoField(primary_key=True)
    loc_name = models.CharField(max_length=100)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=10, decimal_places=6)
    default_home = models.BooleanField(default=False)
    default_dest = models.BooleanField(default=False)

    user_id = models.ForeignKey(
        UserInfo, on_delete=models.CASCADE, related_name='locations')

    def __str__(self):
        return self.loc_name


class PrepActivityTime(models.Model):
    prep_activity_name = models.CharField(max_length=100, primary_key=True)
    prep_activity_time = models.IntegerField()

    user_id = models.ForeignKey(
        UserInfo, on_delete=models.CASCADE, related_name='prep_activities')

    def __str__(self):
        return self.prep_activity_name


class TotalPrepTime():
    # iteration = models.AutoField(primary_key=True)
    iteration = models.IntegerField()
    prep_time = models.IntegerField()

    user_id = models.ForeignKey(
        UserInfo, on_delete=models.CASCADE, related_name='total_prep_times')

    class Meta:
        unique_together = (('iteration', 'user_id'),)

    def __str__(self):
        return f"Iteration {self.iteration} - Total Prep Time: {self.prep_time}"
