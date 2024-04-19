from django.urls import path
from . import views
from .views import (
    MLView
)

urlpatterns = [
    path('predict/', MLView.as_view() , name='predict_times'),
]

# from django.urls import path
# from .views import (MLModel)

# urlpatterns = [
#     path('train/', MLModel.as_view(), name='train-models'),
#     path('predict/', MLModel.as_view(), name='predict-times'),
# ]

# from django.urls import path
# from .views import (predict_times)

# urlpatterns = [
#     path('predict/', predict_times , name='predict_times'),
# ]
