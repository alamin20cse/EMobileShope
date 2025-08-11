from django.urls import path,include
from .views import ProductView,CatagoryViewset
from rest_framework import routers

route=routers.DefaultRouter()
route.register('categori',CatagoryViewset,basename='CategoryView')
urlpatterns = [
    path("", include(route.urls)),
    path('product/',ProductView.as_view(),name='product'),
    path('product/<int:id>/',ProductView.as_view(),name='product-details')
    
]


