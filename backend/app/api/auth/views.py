from rest_framework.views import APIView, status
from rest_framework.response import Response
from .serializers import UserAuthSerializer
from django.contrib.auth import authenticate
from ...models import UserAuth

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print("get_token token = ", token)

        # Add custom claims
        token['email'] = user.email
        token['uid'] = user.uid
        # ...
        print("get_token token = ", token)
        # return {"email": user.email, "token": token}
        return token
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(APIView):
    def post(self, request):
        serializer = UserAuthSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = UserAuth.objects.filter(email=email).first()

        serializer = MyTokenObtainPairSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            user = authenticate(email=email, password=password)

            if user is None:
                return Response({
                    'status': 400,
                    'message': 'User not found',
                    'data': {}
                }, status=status.HTTP_400_BAD_REQUEST)
            
            if not user.check_password(password):
                return Response({
                    'status': 400,
                    'message': 'Invalid password',
                    'data': {}
                }, status=status.HTTP_400_BAD_REQUEST)
            
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    