from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response   
from ...models import Schedule
from ...serializers import ScheduleSerializer

# list all schedules 
class ScheduleViewAll(generics.ListCreateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

# list a specific schedule
class ScheduleViewSingle(generics.RetrieveUpdateDestroyAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

# create schedule
class ScheduleCreate(generics.CreateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

# delete schedule
    
# update schedule
