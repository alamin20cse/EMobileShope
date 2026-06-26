from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        depth = 1
     

    def to_representation(self, instance):
        """Override to return full Cloudinary URL for image."""
        rep = super().to_representation(instance)
        if instance.image:
            rep['image'] = instance.image.url  # CloudinaryField full URL
        return rep

class CatagorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"




class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'photo', 'password', 'confirm_password')

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)  # password auto-hash
        return user



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'photo', 'is_staff', 'is_blocked')

    def to_representation(self, instance):
        """Override to return full Cloudinary URL for photo."""
        rep = super().to_representation(instance)
        if instance.photo:  # Use 'photo' instead of 'image'
            rep['photo'] = instance.photo.url  # CloudinaryField full URL
        return rep



class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"
        # depth = 1




class CartProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartProduct
        fields = "__all__"
        depth = 1



class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"
        depth = 1


    
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'





class ReviewSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('email', 'date')
     

    def to_representation(self, instance):
        """Override to return full Cloudinary URL for image."""
        rep = super().to_representation(instance)
        if instance.image:
            rep['image'] = instance.image.url  # Cloudinary full URL
        return rep


