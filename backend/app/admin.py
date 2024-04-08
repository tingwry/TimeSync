from django.contrib import admin
from .models import UserInfo, Schedule, Location

# Register your models here.
admin.site.register(UserInfo)
admin.site.register(Schedule)
admin.site.register(Location)