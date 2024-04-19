# from rest_framework import serializers
# from ...models import UserAuth, UserInfo

# class EmailCheckSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserAuth
#         fields = ['email']

#     def validate_email(self, value):
#         # Check if email is already in use
#         if UserAuth.objects.filter(email=value).exists():
#             raise serializers.ValidationError('This email is already in use.')
#         return value