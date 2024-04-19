from django.urls import path, include
from . import views

from .views import (
    MyTokenObtainPairView, 
    EmailCheckView, 
    RegisterView, 
    GetUser, 
    ResetPasswordView, 
    SignOutView, 
    DeleteAccountView
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('check-email/', EmailCheckView.as_view(), name='check_email'),
    path('register/', RegisterView.as_view(), name='register'),
    path('get-user/', GetUser.as_view(), name='get_user'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset_password'),
    # path('sign-in/', TokenObtainPairView.as_view(), name='sign_in'),
    path('sign-out/', SignOutView.as_view(), name='sign_out'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete_account'),
]