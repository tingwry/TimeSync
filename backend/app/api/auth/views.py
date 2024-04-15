from rest_framework.views import APIView, status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import MyTokenObtainPairSerializer, EmailCheckSerializer, RegisterSerializer, GetUserInfoSerializer, SignOutSerializer, ResetPasswordSerializer, DeleteAccountSerializer
from ...models import UserAuth, UserInfo

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
    
# error handling + refresh is not implemented
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            # Retrieve access token from validated data
            access_token = serializer.validated_data['access']

            # Decode access token to get user info
            decoded_token = AccessToken(access_token)
            uid = decoded_token['uid']
            username = decoded_token['username']
            name = decoded_token['name']

            res = {
                'access': access_token,
                'refresh': serializer.validated_data['refresh'],
                'uid': uid,
                'username': username,
                'name': name
            }
            return Response(res, status=status.HTTP_200_OK)  
        # return Response({ "error": "Email or password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)  

# ok
class EmailCheckView(APIView):
    def post(self, request):
        serializer = EmailCheckSerializer(data=request.data)
        if serializer.is_valid():
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ok   
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ok
class GetUser(APIView):
    serializer_class = GetUserInfoSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        user_info = UserInfo.objects.get(uid=user)
        data = {
            "email": user.email,
            "username": user_info.username,
            "name": user_info.name,
            "phone_number": user_info.phone_number
        }
        return Response(data, status=status.HTTP_200_OK)

# ok
class SignOutView(APIView):
    serializer_class = SignOutSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = SignOutSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # try:
        #     refresh_token = request.data["refresh_token"]
        #     token = RefreshToken(refresh_token)
        #     token.blacklist()

        #     return Response(status=status.HTTP_205_RESET_CONTENT)
        # except Exception as e:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)

# ok
class ResetPasswordView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.update(instance=request.user, validated_data=serializer.validated_data)
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DeleteAccountView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request):
        serializer = DeleteAccountSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.delete(instance=request.user)
            return Response(status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)