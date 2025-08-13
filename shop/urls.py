from django.urls import path,include
from .views import ProductView,CatagoryViewset,UserViewSet,RegisterView,MyCart,OldOrders,AddtoCartView
from rest_framework import routers

route=routers.DefaultRouter()
route.register('categori',CatagoryViewset,basename='CategoryView'),
route.register('cart',MyCart,basename='cart'),
route.register('user', UserViewSet, basename='user')  # for profile endpoint
route.register('orders', OldOrders, basename='orders')  
urlpatterns = [
    path("", include(route.urls)),
    path('product/',ProductView.as_view(),name='product'),
    path('product/<int:id>/',ProductView.as_view(),name='product-details'),
   
    path("register/", RegisterView.as_view(), name="register"),
       path("addtocart/",AddtoCartView.as_view(),name="addtocart"),

    
]


