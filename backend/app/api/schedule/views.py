from rest_framework import generics
from rest_framework.response import Response
from ...models import Schedule
from ...serializers import ScheduleSerializer

# view all schedule
class ScheduleViewAll(generics.ListAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

#view single schedule
class ScheduleViewSingle(generics.RetrieveAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

# view most recent schedule
class ScheduleViewRecent(generics.RetrieveAPIView):
    serializer_class = ScheduleSerializer

    def get_object(self):
        # Retrieve the most recent schedule based on the date
        most_recent_schedule = Schedule.objects.order_by('-date').first()
        
        return most_recent_schedule

# create schedule
class ScheduleCreate(generics.CreateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

# delete schedule
class ScheduleDelete(generics.DestroyAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(print("delete Movie"))

# edit schedule
class ScheduleEdit(generics.UpdateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    partial = True
