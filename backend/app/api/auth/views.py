from rest_framework.views import APIView, status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    MyTokenObtainPairSerializer, 
    EmailCheckSerializer, 
    RegisterSerializer, 
    SignOutSerializer, 
    ResetPasswordSerializer, 
    UserInfoSerializer, 
    DeleteAccountSerializer
)
from ...models import UserAuth, UserInfo

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
    
# error handling
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
        print(request.data)
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ok
class GetUser(APIView):
    serializer_class = UserInfoSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        userinfo = UserInfo.objects.get(uid=user.uid_id)
        data = {
            "email": user.email,
            "username": userinfo.username,
            "name": userinfo.name,
            "phone_number": userinfo.phone_number
        }
        return Response(data, status=status.HTTP_200_OK)

class EditInfo(generics.UpdateAPIView):
    serializer_class = UserInfoSerializer
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        user = request.user
        userinfo = UserInfo.objects.get(uid=user.uid_id)
        serializer = self.serializer_class(userinfo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# ok
class ResetPasswordView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.update(instance=request.user, validated_data=serializer.validated_data)
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ok
class SignOutView(APIView):
    serializer_class = SignOutSerializer
    # permission_classes = (IsAuthenticated,)

    def post(self, request):
        if request.user.is_authenticated:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_200_OK)
        # try:
        #     refresh_token = request.data["refresh_token"]
        #     token = RefreshToken(refresh_token)
        #     token.blacklist()

        #     return Response(status=status.HTTP_205_RESET_CONTENT)
        # except Exception as e:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)


class DeleteAccountView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request):
        serializer = DeleteAccountSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.delete(instance=request.user)
            return Response(status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)