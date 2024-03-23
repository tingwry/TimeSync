from django.urls import path
from . import views

urlpatterns = [
    path('view/', views.ScheduleViewAll.as_view(), name='schedule_view_all'),
    path('view/<int:pk>/', views.ScheduleViewSingle.as_view(), name='schedule_view_single'),
    path('create/', views.ScheduleCreate.as_view(), name='schedule_create'),
]