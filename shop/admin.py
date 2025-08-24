from django.contrib import admin
from .models import *



class UserAdmin(admin.ModelAdmin):
    list_display='__all__',
admin.site.register(User)



class CategoryAdmin(admin.ModelAdmin):
    list_display=("id",'title','date')
admin.site.register(Category,CategoryAdmin)

class ProductAdmin(admin.ModelAdmin):
    list_display=("id","title","category","selling_price","date")
admin.site.register(Product,ProductAdmin)

class CartAdmin(admin.ModelAdmin):
    list_display=("id","customer","total","complit","date")
admin.site.register(Cart,CartAdmin)

# class CartProductAdmin(admin.ModelAdmin):
#     list_display = ("id","cart","price","quantity","subtotal")
admin.site.register(CartProduct)

class OrderAdmin(admin.ModelAdmin):
    list_display = ("id","cart","date")
admin.site.register(Order,OrderAdmin)


class PaymentAdmin(admin.ModelAdmin):
    list_display='__all__',
admin.site.register(Payment)



# Profile
# Category
# Product
# Cart
# CartProduct
# Order