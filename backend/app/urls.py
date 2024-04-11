from django.urls import path, include
from . import views
from rest_framework import routers

routers = routers.DefaultRouter()
routers.register(r'userinfo', views.UserInfoViewSet)

urlpatterns = [
    path('', include(routers.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # path('schedule/', include('app.api.schedule.urls'), name='schedule'),
    path('auth/', include('app.api.auth.urls'), name='auth'),
    path('schedule/', include('app.api.schedule.urls')),
    path('location/', include('app.api.location.urls')),
    path('ML/', include('app.api.ML.urls'), name='ML' )
]