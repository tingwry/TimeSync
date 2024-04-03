from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.
class UserAuthManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

# class UserInfo(models.Model):
#     user_id = models.AutoField(primary_key=True)
#     username = models.CharField(max_length=100, unique=True)
#     name = models.CharField(max_length=100)
#     alarm_sound = models.CharField(max_length=100)
#     sched_reminder = models.BooleanField(default=True)
#     departure_time = models.BooleanField(default=True)
#     new_friends = models.BooleanField(default=True)
#     wake_up_aids_requests = models.BooleanField(default=True)
#     phone_number = models.CharField(max_length=24)
#     total_prep_time = models.IntegerField(default=0)

#     def __str__(self):
#         return self.username
    
class UserAuth(AbstractUser):
    uid = models.AutoField(primary_key=True)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=100)

    first_name = None
    last_name = None
    username = None

    # user_id = models.OneToOneField(
    #     UserInfo, on_delete=models.CASCADE, primary_key=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password']

    def __str__(self):
        return self.email
    
    objects = UserAuthManager()

# class UserAuth(models.Model):
#     email = models.EmailField()
#     password = models.CharField(max_length=100)

#     user_id = models.OneToOneField(
#         UserInfo, on_delete=models.CASCADE, primary_key=True)

#     def __str__(self):
#         return self.email