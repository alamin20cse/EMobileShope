from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField

class User(AbstractUser):
    photo = CloudinaryField('image', blank=True, null=True)  # Cloudinary handles storage
    is_blocked = models.BooleanField(default=False)



class Category(models.Model):
    title = models.CharField(max_length=199)
    date = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.title
    
class Product(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField(auto_now_add=True)
    category = models.ForeignKey(Category,on_delete=models.SET_NULL,blank=True, null=True)
    image = CloudinaryField('image', folder='products/', null=True, blank=True)  # CloudinaryField
    marcket_price = models.PositiveIntegerField()
    selling_price = models.PositiveIntegerField()
    description = models.TextField()
    def __str__(self):
        return self.title

class Cart(models.Model):
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    total = models.PositiveIntegerField()
    complit = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)

class CartProduct(models.Model):
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE)
    product = models.ManyToManyField(Product)
    price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()
    subtotal = models.PositiveIntegerField()
    def __str__(self):
        return f"Cart=={self.cart.id}<==>CartProduct:{self.id}==Qualtity=={self.quantity}"


ORDER_STATUS = (
    ("Order Received", "Order Received"),
    ("Order Processing", "Order Processing"),
    ("On the way", "On the way"),
    ("Order Completed", "Order Completed"),
    ("Order Canceled", "Order Canceled"),
)
class Order(models.Model):
    cart  = models.OneToOneField(Cart,on_delete=models.CASCADE)
    address = models.CharField(max_length=255)
    mobile = models.CharField(max_length=16)
    email = models.CharField(max_length=200)
    total = models.PositiveIntegerField()
    discount = models.PositiveIntegerField()
    order_status = models.CharField(max_length=100,choices=ORDER_STATUS,default="Order Received")
    date = models.DateField(auto_now_add=True)
    payment_complit = models.BooleanField(default=False,blank=True, null=True)








class Payment(models.Model):
    email = models.EmailField()
    price = models.FloatField()
    transactionId = models.CharField(max_length=255)
    date = models.DateTimeField()
    orderId = models.CharField(max_length=255)  # single id or comma separated


    def __str__(self):
        return self.transactionId




class Review(models.Model):
    description=models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="reviews")
    email=models.EmailField()
    image = CloudinaryField('image', folder='review/', null=True, blank=True)  # CloudinaryField
    def __str__(self):
        return self.email

