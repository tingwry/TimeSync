from django.urls import path, include
from . import views

from .views import MyTokenObtainPairView, RegisterView, EmailCheckView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('check-email/', EmailCheckView.as_view(), name='check_email'),
    path('register/', RegisterView.as_view(), name='register'),
    
    # path('login/', LoginView.as_view(), name='login'),
]