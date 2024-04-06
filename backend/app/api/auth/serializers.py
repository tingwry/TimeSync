from rest_framework import serializers
from ...models import UserAuth, UserInfo

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['uid'] = user.uid
        # ...

        return token


class EmailCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAuth
        fields = ['email']

    def validate_email(self, value):
        # Check if email is already in use
        if UserAuth.objects.filter(email=value).exists():
            raise serializers.ValidationError('This email is already in use.')
        return value


class RegisterUserAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAuth
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        return UserAuth.objects.create_user(**validated_data)
  

class RegisterUserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['username', 'name', 'phone_number']

    def validate_username(self, value):
        # Check if username is already in use
        if UserInfo.objects.filter(username=value).exists():
            raise serializers.ValidationError('This username is already in use.')
        return value

    def create(self, validated_data):
        return UserInfo.objects.create(**validated_data)
    
    
class RegisterSerializer(serializers.ModelSerializer):
    user_auth = RegisterUserAuthSerializer()
    user_info = RegisterUserInfoSerializer()

    class Meta:
        model = UserAuth
        fields = ['user_auth', 'user_info']

    def create(self, validated_data):
        userauth_data = validated_data.pop('user_auth')
        userinfo_data = validated_data.pop('user_info')

        userauth_serializer = RegisterUserAuthSerializer(data=userauth_data)
        userinfo_serializer = RegisterUserInfoSerializer(data=userinfo_data)

        if userauth_serializer.is_valid() and userinfo_serializer.is_valid():
            userauth = userauth_serializer.save()
            userinfo['uid'] = userauth.uid
            userinfo = userinfo_serializer.save()
            return userinfo
        raise serializers.ValidationError(userinfo_serializer.errors)
