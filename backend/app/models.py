from django.db import models

# Create your models here.

transportation_mode_choices = [
    ('car', 'Car'),
    ('motorcycle', 'Motorcycle'),
    ('bus', 'Bus'),
    ('metro', 'Metro'),
    ('walk', 'Walk')
]

class UserInfo(models.Model):
    userId = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    alarm_sound = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=24)
    total_prep_time = models.IntegerField

    def __str__(self):
        return self.username


class Schedule(models.Model):
    event_id = models.AutoField(primary_key=True)
    event_name = models.CharField(max_length=100)
    # date = models.DateField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    transportation_mode = models.CharField(
        max_length=20, choices=transportation_mode_choices)
    extra_prep_time = models.IntegerField()
    note = models.TextField()

    def __str__(self):
        return self.event_name
