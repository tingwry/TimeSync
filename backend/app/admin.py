from django.contrib import admin
from .models import UserInfo
from .models import Schedule

# Register your models here.
admin.site.register(UserInfo)
admin.site.register(Schedule)