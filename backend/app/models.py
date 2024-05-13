from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


# Create your models here.

transportation_mode_choices = [
    ('car', 'Car'),
    ('motorcycle', 'Motorcycle'),
    ('bus', 'Bus'),
    ('metro', 'Metro'),
    ('walk', 'Walk')
]


class UserInfo(models.Model):
    # uid = models.OneToOneField(
    #     UserAuth, on_delete=models.CASCADE, primary_key=True, related_name='userinfo')
    uid = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    alarm_sound = models.CharField(max_length=100, default='default')
    sched_reminder = models.BooleanField(default=True)
    departure_time = models.BooleanField(default=True)
    new_friends = models.BooleanField(default=True)
    wake_up_aids_requests = models.BooleanField(default=True)
    phone_number = models.CharField(max_length=24)
    total_prep_time = models.IntegerField(default=0)

    def __str__(self):
        return (str(self.uid))
    
class UserAuthManager(BaseUserManager):
    def create_user(self, email=None, password=None, google_id=None, **extra_fields):
        if email:
            email = self.normalize_email(email)
        else:
            raise ValueError('Email field must be set')
        
        user = self.model(
            email=email,
            google_id=google_id,
            **extra_fields
        )

        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)
    
class UserAuth(AbstractUser):
    uid = models.OneToOneField(
        UserInfo, on_delete=models.CASCADE, primary_key=True)
    # uid = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    google_id = models.CharField(max_length=100, blank=True, null=True)

    first_name = None
    last_name = None
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password']

    def __str__(self):
        return str(self.uid)

    objects = UserAuthManager()


class Schedule(models.Model):
    event_id = models.AutoField(primary_key=True)
    event_name = models.CharField(max_length=100)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField(null=True)
    transportation_mode = models.CharField(
        max_length=20, choices=transportation_mode_choices)
    extra_prep_time = models.IntegerField()
    note = models.TextField(blank=True, null=True)

    uid = models.ForeignKey(
        UserInfo, on_delete=models.CASCADE, related_name='schedules')
    # user_id = models.ForeignKey(
    #     UserInfo, on_delete=models.CASCADE, related_name='schedules')
    sched_start = models.ForeignKey(
        'Location', on_delete=models.CASCADE, related_name='start_locations')
    sched_destination = models.ForeignKey(
        'Location', on_delete=models.CASCADE, related_name='destination_locations')
    wake_up_aids = models.ForeignKey(
        UserInfo, on_delete=models.CASCADE, related_name='wake_up_friends')
    # prep_activities = models.ManyToManyField('PrepActivityTime')

    def __str__(self):
        return str(self.event_id)
    
    # class Meta:
    #     indexes = [
    #         models.Index(fields=['uid','date', 'start_time']),
    #     ]

class Location(models.Model):
    loc_id = models.AutoField(primary_key=True)
    loc_name = models.CharField(max_length=100)
    latitude = models.DecimalField(max_digits=22, decimal_places=16)
    longitude = models.DecimalField(max_digits=22, decimal_places=16)
    default_home = models.BooleanField(default=False)
    default_dest = models.BooleanField(default=False)

    uid = models.ForeignKey(
        UserInfo, on_delete=models.CASCADE, related_name='locations')
    # user_id = models.ForeignKey(
    #     UserInfo, on_delete=models.CASCADE, related_name='locations')

    def __str__(self):
        return str(self.loc_id)
    
    class Meta:
        indexes = [
            models.Index(fields=['uid', 'latitude', 'longitude']),
        ]
        indexes = [
            models.Index(fields=['uid', 'default_home', 'default_dest']),
        ]

class PrepActivityTime(models.Model):
    prep_activity_name = models.CharField(max_length=100, primary_key=True)
    prep_activity_time = models.IntegerField()

    uid = models.ForeignKey(
        UserInfo, on_delete=models.CASCADE, related_name='prep_activities')
    # user_id = models.ForeignKey(
    #     UserInfo, on_delete=models.CASCADE, related_name='prep_activities')

    def __str__(self):
        return self.prep_activity_name


class TotalPrepTime(models.Model):
    iteration = models.AutoField(primary_key=True)
    # iteration = models.IntegerField()
    prep_time = models.IntegerField()

    uid = models.ForeignKey(
        UserInfo, on_delete=models.CASCADE, related_name='total_prep_times')
    # user_id = models.ForeignKey(
    #     UserInfo, on_delete=models.CASCADE, related_name='total_prep_times')

    # class Meta:
    #     unique_together = (('iteration', 'user_id'),)

    def __str__(self):
        return f"Iteration {self.iteration} - Total Prep Time: {self.prep_time}"

    objects = models.Manager()
