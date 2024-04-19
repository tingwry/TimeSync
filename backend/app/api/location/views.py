from rest_framework import generics
from rest_framework.views import APIView, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ...models import UserInfo, Location
from ...serializers import LocationSerializer

# view all schedule
class LocationViewAll(generics.ListAPIView):
    # queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Location.objects.filter(uid=user.uid_id)


#view single schedule
class LocationViewSingle(generics.RetrieveAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class LocationViewSinglee(generics.RetrieveAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        location_id = self.request.headers.get('Location-ID')
        return Location.objects.get(loc_id=location_id)
    

# create schedule
class LocationCreate(generics.CreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        user = self.request.user
        userinfo = UserInfo.objects.get(uid=user.uid_id)
        serializer.save(uid=userinfo)

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
