from rest_framework import serializers
from ...models import UserAuth, UserInfo

from django.contrib.auth import authenticate

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken, TokenError


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get('email').lower()
        password = attrs.get('password')

        if email and password:
            if not UserAuth.objects.filter(email=email).exists():
                raise serializers.ValidationError({'email': ['User does not exist.']})
            
            # Authenticate user
            user = authenticate(email=email, password=password)

            # Validate password
            if user is None or not user.check_password(password):
                raise serializers.ValidationError({'password': ['Password is incorrect.']})
            
            # token
            # Custom claims
            token = super().get_token(user)
            userinfo = UserInfo.objects.get(uid=user.uid_id)
            token['uid'] = userinfo.uid
            token['username'] = userinfo.username
            token['name'] = userinfo.name
            
            # return token
            return {
                'access': str(token.access_token),
                'refresh': str(token),
            }
        
        else:
            raise serializers.ValidationError({
                'email': ['This field is required.'],
                'password': ['This field is required.']
            })
        
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        userinfo = UserInfo.objects.get(uid=user.uid_id)

        # Add custom claims
        token['uid'] = userinfo.uid
        token['username'] = userinfo.username
        token['name'] = userinfo.name
        # ...

        return token

# ok
class EmailCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAuth
        fields = ['email']

    def validate_email(self, value):
        value = value.lower()

        # Check if email is already in use
        if UserAuth.objects.filter(email=value).exists():
            raise serializers.ValidationError('This email is already in use.')
        return value

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['username', 'name', 'phone_number']

    def validate_username(self, value):
        value = value.lower()

        # Check if username is already in use
        if UserInfo.objects.filter(username=value).exists():
            raise serializers.ValidationError('This username is already in use.')
        return value

class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=100, write_only=True)
    username = serializers.CharField(max_length=100)
    name = serializers.CharField(max_length=100)
    phone_number = serializers.CharField(max_length=24)

    def validate_email(self, value):
        value = value.lower()

        # Check if email is already in use
        if UserAuth.objects.filter(email=value).exists():
            raise serializers.ValidationError('This email is already in use.')
        return value

    def validate_username(self, value):
        value = value.lower()

        # Check if username is already in use
        if UserInfo.objects.filter(username=value).exists():
            raise serializers.ValidationError('This username is already in use.')
        return value

    def create(self, validated_data):
        userinfo_data = {
            'username': validated_data['username'],
            'name': validated_data['name'],
            'phone_number': validated_data['phone_number']
        }

        userauth_data = {
            'email': validated_data['email'],
            'password': validated_data['password']
        }

        userinfo_instance = UserInfo.objects.create(**userinfo_data)
        userauth_instance = UserAuth.objects.create_user(uid=userinfo_instance, **userauth_data)

        return {
            'userauth': userauth_instance,
            'userinfo': userinfo_instance
        }
        
# ok
class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['username', 'name', 'phone_number']

    def validate_username(self, value):
        value = value.lower()

        # Check if username is already in use
        if UserInfo.objects.filter(username=value).exists():
            raise serializers.ValidationError('This username is already in use.')
        return value

# ok
class ResetPasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)

    def validate_current_password(self, value):
        user = self.context['request'].user

        if not user.check_password(value):
            print("Current password is incorrect")
            raise serializers.ValidationError('Current password is incorrect.')
        return value

    def update(self, instance, validated_data):
        print(validated_data)
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance

# ok
class SignOutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, value):
        self.token = value['refresh']
        return value
    
    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('Failed to blacklist token.')

# ok
class DeleteAccountSerializer(serializers.ModelSerializer):
    class Meta: 
        model = UserAuth
        fields = ['password']
    
    def validate_password(self, value):
        user = self.context['request'].user

        if not user.check_password(value):
            print("Current password is incorrect")
            raise serializers.ValidationError('Current password is incorrect.')
        return value

    def delete(self):
        user = self.context['request'].user
        userinfo = UserInfo.objects.get(uid=user.uid_id)
        userinfo.delete()  # Delete UserInfo instance and its associated instances

    