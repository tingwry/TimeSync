from django.db import models

# Create your models here.


class UserInfo(models.Model):
    userId = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    alarm_sound = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=24)
    total_prep_time = models.IntegerField

    def __str__(self):
        return self.username
