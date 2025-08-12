from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        depth = 1


class CatagorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class UserSeralizer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','password']
        estra_kwargs={'password':{'write_only':True}}
    def create(self, validated_data):
        user=User.objects.create_user(**validated_data)
        return user
    