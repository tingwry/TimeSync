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

# view locations with default home
class DefaultHomeLocationView(generics.ListAPIView):
    serializer_class = LocationSerializer

    def get_queryset(self):
        return Location.objects.filter(default_home=True, default_dest=False)


# view locations with default destination
class DefaultDestinationLocationView(generics.ListAPIView):
    serializer_class = LocationSerializer

    def get_queryset(self):
        return Location.objects.filter(default_dest=True, default_home=False)
