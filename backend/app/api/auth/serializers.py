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