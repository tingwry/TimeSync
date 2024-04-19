# from django.urls import path
# from . import views

# urlpatterns = [
#     # path('predict/', views.predict_times_view, name='predict_times'),
#     # path('predict/', MLViews.as_view(), name='predict_times'),
# ]

from django.urls import path
from .ml_model import MLModel

urlpatterns = [
    path('train/', MLModel.as_view(), name='train-models'),
    path('predict/', MLModel.as_view(), name='predict-times'),
]
