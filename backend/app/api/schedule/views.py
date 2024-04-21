from rest_framework import generics
from rest_framework.views import APIView, status
from rest_framework.response import Response
from ...models import UserInfo, Schedule
from ...serializers import ScheduleSerializer
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone

# view all schedule
class ScheduleViewAll(generics.ListAPIView):
    serializer_class = ScheduleSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        # Retrieve all schedules associated with the user
        schedules = Schedule.objects.filter(uid=user.uid_id)
        serializer = ScheduleSerializer(schedules, many=True)
        # print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
        # print("serializer.errors")
        # print(serializer.errors)
        # return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

    # def get_queryset(self):
    #     user = self.request.user
    #     current_datetime = timezone.now()

    #     # Retrieve all schedules associated with the user that are greater than or equal to the current datetime
    #     queryset = Schedule.objects.filter(uid=user.uid_id, date__gte=current_datetime).order_by('date', 'start_time')

#view single schedule
class ScheduleViewSingle(generics.RetrieveAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

# view most recent schedule
# ok?
class ScheduleViewRecent(generics.RetrieveAPIView):
    serializer_class = ScheduleSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        user = self.request.user

        # Retrieve the most recent schedule based on the date
        queryset = Schedule.objects.filter(uid=user.uid_id).order_by('-date')
        return queryset.first()

    # def retrieve(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     if instance:
    #         serializer = self.get_serializer(instance)
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response({'message': 'data not found'}, status=status.HTTP_404_NOT_FOUND)
    
        # def get(self, request):
    #     user = request.user
   
    #     # Retrieve the most recent schedule based on the date
    #     most_recent_schedule = Schedule.objects.filter(uid=user.uid_id).order_by('-date').first()
    #     if most_recent_schedule:
    #         serializer = ScheduleSerializer(most_recent_schedule)
    #         # print(serializer.data)
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response({'message': 'data not found'}, status=status.HTTP_404_NOT_FOUND)
    #     # most_recent_schedule = Schedule.objects.order_by('-date').first(uid=user.uid_id)
    #     # print(most_recent_schedule)
    #     # return Response(most_recent_schedule, status=status.HTTP_200_OK)
    #     # return most_recent_schedule
    

# create schedule
# okkkkkkk
class ScheduleCreate(generics.CreateAPIView):
    serializer_class = ScheduleSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):  
        print('create schedule')
        print(request.data)

        serializer = ScheduleSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            userinfo = UserInfo.objects.get(uid=user.uid_id)
            serializer.save(uid=userinfo)  # Save schedule with associated user
            Response(status=status.HTTP_200_OK)
            # return Response(serializer.data)
        
        return Response(serializer.errors)
        # return Response(request.data)
    

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
