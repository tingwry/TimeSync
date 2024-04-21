from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.TotalPrepTimeCreate.as_view()),
    path('view/', views.TotalPrepTimeViewAll.as_view()),
    # path('recent/', views.TotalPrepTimeViewRecent.as_view()),
]
