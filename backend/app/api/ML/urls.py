from django.urls import path
from . import views
from .views import (
    MLView
)

urlpatterns = [
    path('predict/', MLView.as_view() , name='predict_times'),
]