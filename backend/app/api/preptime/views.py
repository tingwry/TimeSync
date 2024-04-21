from rest_framework import generics
from rest_framework.response import Response
from ...models import TotalPrepTime
from ...serializers import TotalPrepTimeSerializer


# create total prep time
class TotalPrepTimeCreate(generics.CreateAPIView):
    queryset = TotalPrepTime.objects.all()
    serializer_class = TotalPrepTimeSerializer

# view all prep time records
class TotalPrepTimeViewAll(generics.ListAPIView):
    queryset = TotalPrepTime.objects.all()
    serializer_class = TotalPrepTimeSerializer

# # view most recent prep time
# class TotalPrepTimeViewRecent(generics.RetrieveAPIView):
#     serializer_class = TotalPrepTimeSerializer

#     def get_object(self):
#         # Retrieve the most recent prep time based on the iteration
#         most_recent_preptime = TotalPrepTime.objects.order_by('-iteration').first()
        
#         return most_recent_preptime