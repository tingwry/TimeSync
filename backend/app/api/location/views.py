from rest_framework import generics
from rest_framework.views import APIView, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ...models import UserInfo, Location
from ...serializers import LocationSerializer
from rest_framework.permissions import IsAuthenticated

# view all schedule
class LocationViewAll(generics.ListAPIView):
    # queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = (IsAuthenticated,)

    # get all locations associated with the user
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

        print(self.request)
        user = self.request.user
        userinfo = UserInfo.objects.get(uid=user.uid_id)
        serializer.save(uid=userinfo)

# view locations with default home
class DefaultHomeLocationView(generics.ListAPIView):
    serializer_class = LocationSerializer
    permission_classes = (IsAuthenticated,)

    # get all locations with default home
    def get_queryset(self):
        user = self.request.user
        return Location.objects.filter(uid=user.uid_id, default_home=True, default_dest=False)


# view locations with default destination
class DefaultDestinationLocationView(generics.ListAPIView):
    serializer_class = LocationSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Location.objects.filter(uid=user.uid_id, default_dest=True, default_home=False)
    
class DefaultLocationView(generics.ListAPIView):
    serializer_class = LocationSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        home = Location.objects.filter(uid=user.uid_id, default_home=True)
        des = Location.objects.filter(uid=user.uid_id, default_dest=True)
        return {'home': home, 'destination': des}
