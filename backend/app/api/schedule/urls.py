from django.urls import path
from . import views

urlpatterns = [
    path('view/', views.ScheduleViewAll.as_view()),
    path('view/<int:pk>/', views.ScheduleViewSingle.as_view()),
    path('create/', views.ScheduleCreate.as_view()),
    path('delete/<int:pk>/', views.ScheduleDelete.as_view()),
    path('edit/<int:pk>/', views.ScheduleEdit.as_view()),
]