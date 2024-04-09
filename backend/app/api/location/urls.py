from django.urls import path
from . import views

urlpatterns = [
    path('view/', views.LocationViewAll.as_view()),
    path('view/<int:pk>/', views.LocationViewSingle.as_view()),
    path('create/', views.LocationCreate.as_view()),
    path('default-home/', views.DefaultHomeLocationView.as_view(), name='default-home'),
    path('default-dest/', views.DefaultDestinationLocationView.as_view(), name='default-dest'),
]