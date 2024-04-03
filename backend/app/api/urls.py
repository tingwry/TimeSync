from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('auth/', include('app.api.auth.urls')),
]