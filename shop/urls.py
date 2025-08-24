from django.urls import path,include
from .views import ProductView,CatagoryViewset,UserViewSet,RegisterView,MyCart,OldOrders,AddtoCartView,UpdateCartProduct,DecreaseCartProduct,Delatecartproduct,Delatefullcart
from rest_framework import routers


from .views import CreatePaymentIntentView, PaymentListView, SavePaymentView


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
    path("updatecartproduct/",UpdateCartProduct.as_view(),name="updatecartproduct"),
    path("decreasecartproduct/",DecreaseCartProduct.as_view(),name="decreasecartproduct"),
    path("deletecartproduct/",Delatecartproduct.as_view(),name="deletecartproduct"),
    path("deletefullcart/",Delatefullcart.as_view(),name="deletefullcart"),



    path('create-payment-intent/', CreatePaymentIntentView.as_view(), name='create-payment-intent'),
    path('payments/', SavePaymentView.as_view(), name='save-payment'),
    path('payments/<str:email>/', PaymentListView.as_view(), name='get-payments'),

    
]


