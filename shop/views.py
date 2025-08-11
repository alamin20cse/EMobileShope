from rest_framework.response import Response
from rest_framework import views,viewsets,generics,mixins
from .models import Product,Category
from .serializers import ProductSerializers,CatagorySerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User


class ProductView(generics.GenericAPIView,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    queryset = Product.objects.all().order_by("-id")
    serializer_class=ProductSerializers
    lookup_field = "id"

    def get(self,request,id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)



class CatagoryViewset(viewsets.ViewSet):
    def list(self,request):
        query = Category.objects.all()
        serializer = CatagorySerializer(query,many=True)
       
        return Response(serializer.data)

    def retrieve(self,request,pk=None):
        query = Category.objects.get(id=pk)
        serializer = CatagorySerializer(query)
        data_data = serializer.data
        all_data = []
        catagory_product = Product.objects.filter(category_id=data_data['id'])
        catagory_product_serilazer = ProductSerializers(catagory_product,many=True)
        data_data['category_product'] = catagory_product_serilazer.data
        all_data.append(data_data)
        return Response(all_data)
