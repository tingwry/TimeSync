from rest_framework import generics
from rest_framework.views import APIView, status
from rest_framework.response import Response
from ...models import UserInfo, Schedule, Location
from .serializers import ScheduleSerializer
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from collections import defaultdict
from django.db.models.functions import ExtractMonth, ExtractYear

# view all schedule
class ScheduleViewAll(generics.ListAPIView):
    serializer_class = ScheduleSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        
        # Retrieve all schedules associated with the user that are greater than or equal to the current datetime
        # queryset = Schedule.objects.filter(uid=user.uid_id, date__gte=current_datetime).order_by('date', 'start_time')
        queryset = Schedule.objects.filter(uid=user.uid_id).order_by('date', 'start_time')
        return queryset
    
    # serializer still not approved thooooo
    # def get_queryset(self):
    #     user = self.request.user

    #     # Annotate the queryset with month and year information
    #     annotated_queryset = (
    #         Schedule.objects
    #         .filter(uid=user.uid_id)
    #         .annotate(month=ExtractMonth('date'), year=ExtractYear('date'))
    #         .order_by('date', 'start_time')
    #     )

    #     # Group the annotated queryset by month and year
    #     grouped_schedules = defaultdict(list)
    #     for schedule in annotated_queryset:
    #         month_year = f"{schedule.year}-{schedule.month}"
    #         grouped_schedules[month_year].append(schedule)

    #     # Convert defaultdict to list of dictionaries
    #     grouped_schedules_list = [
    #         {'month_year': key, 'schedules': value} 
    #         for key, value in grouped_schedules.items()
    #     ]

    #     return grouped_schedules_list

#view single schedule
class ScheduleViewSingle(generics.RetrieveAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

# view most recent schedule
class ScheduleViewRecent(generics.RetrieveAPIView):
    serializer_class = ScheduleSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        user = self.request.user
        current_datetime = timezone.now()

        # Retrieve the most recent schedule based on the date
        queryset = Schedule.objects.filter(uid=user.uid_id, date__gte=current_datetime).order_by('date', 'start_time')
        return queryset.first()
    

# create schedule
class ScheduleCreate(generics.CreateAPIView):
    serializer_class = ScheduleSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):  
        print('create schedule req')
        print(request.data)

        user = request.user
        if (request.data.get('sched_start') == None):
            request.data['sched_start'] = Location.objects.filter(uid=user.uid_id, default_home=True).first().loc_id
        if (request.data.get('sched_destination') == None):
            request.data['sched_destination'] = Location.objects.filter(uid=user.uid_id, default_dest=True).first().loc_id
        if (request.data.get('wake_up_aids') == None):
            request.data['wake_up_aids'] = 1

        serializer = ScheduleSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            userinfo = UserInfo.objects.get(uid=user.uid_id)
            serializer.save(uid=userinfo)  # Save schedule with associated user
            print('schedule created')
            print(serializer.data)
            return Response(status=status.HTTP_200_OK)
        print("errors")
        print(serializer.errors)
        print(serializer.validated_data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

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
