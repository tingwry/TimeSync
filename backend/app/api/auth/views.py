from rest_framework.views import APIView, status
from rest_framework.response import Response
from .serializers import MyTokenObtainPairSerializer, EmailCheckSerializer, RegisterSerializer
from django.contrib.auth import authenticate
from ...models import UserAuth

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import AccessToken
    
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

            res = {
                'access': access_token,
                'refresh': serializer.validated_data['refresh'],
                'uid': uid
            }
            return Response(res, status=status.HTTP_200_OK)    

# class LoginView(APIView):
#     def post(self, request):
#         email = request.data['email']
#         password = request.data['password']

#         user = UserAuth.objects.filter(email=email).first()

#         serializer = MyTokenObtainPairSerializer(data=request.data)
#         if serializer.is_valid():
#             email = serializer.validated_data['email']
#             password = serializer.validated_data['password']

#             user = authenticate(email=email, password=password)

#             if user is None:
#                 return Response({
#                     'status': 400,
#                     'message': 'User not found',
#                     'data': {}
#                 }, status=status.HTTP_400_BAD_REQUEST)
            
#             if not user.check_password(password):
#                 return Response({
#                     'status': 400,
#                     'message': 'Invalid password',
#                     'data': {}
#                 }, status=status.HTTP_400_BAD_REQUEST)
            
#             return Response(serializer.validated_data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmailCheckView(APIView):
    def post(self, request):
        serializer = EmailCheckSerializer(data=request.data)
        if serializer.is_valid():
            return Response({"email": False}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)