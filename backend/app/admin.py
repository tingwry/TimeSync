from django.contrib import admin
from .models import UserAuth, UserInfo, Schedule

# Register your models here.
admin.site.register(UserAuth)
admin.site.register(UserInfo)
admin.site.register(Schedule)