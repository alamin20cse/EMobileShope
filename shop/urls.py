from django.urls import path,include
from .views import ProductView,CatagoryViewset,UserViewSet,RegisterView
from rest_framework import routers

route=routers.DefaultRouter()
route.register('categori',CatagoryViewset,basename='CategoryView'),
route.register('user', UserViewSet, basename='User')  # for profile endpoint
urlpatterns = [
    path("", include(route.urls)),
    path('product/',ProductView.as_view(),name='product'),
    path('product/<int:id>/',ProductView.as_view(),name='product-details'),
   
       path("register/", RegisterView.as_view(), name="register"),

    
]


