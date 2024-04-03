from rest_framework import serializers
from ...models import UserAuth

class UserAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAuth
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserAuth.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    # def validate(self, validated_data):
    #     email = validated_data.get('email', None)
    #     password = validated_data.get('password', None)
        
    #     if email is None:
    #         raise serializers.ValidationError('An email address is required to log in.')
        
    #     if password is None:
    #         raise serializers.ValidationError('A password is required to log in.')
        
    #     user = authenticate(email=email, password=password)
        
    #     if user is None:
    #         raise serializers.ValidationError('A user with this email and password was not found.')
        
    #     return {
    #         'email': user.email,
    #         'uid': user.uid
    #     }