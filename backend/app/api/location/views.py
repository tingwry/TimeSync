from rest_framework import generics
from rest_framework.response import Response
from ...models import Location
from ...serializers import LocationSerializer

# view all schedule
class LocationViewAll(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

#view single schedule
class LocationViewSingle(generics.RetrieveAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


# create schedule
class LocationCreate(generics.CreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

