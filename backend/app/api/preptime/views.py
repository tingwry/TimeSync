from rest_framework import generics
from rest_framework.response import Response
from ...models import TotalPrepTime
from ...serializers import TotalPrepTimeSerializer


# create total prep time
class TotalPrepTimeCreate(generics.CreateAPIView):
    queryset = TotalPrepTime.objects.all()
    serializer_class = TotalPrepTimeSerializer
