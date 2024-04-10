from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.predict_times_view, name='predict_times'),
]