from rest_framework.response import Response
from rest_framework import views,viewsets,generics,mixins
from .models import Product,Category,Cart,CartProduct
from .serializers import ProductSerializers,CatagorySerializer,UserSerializer,UserRegisterSerializer,CartSerializer,CartProductSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.contrib.auth import get_user_model





class ProductView(generics.GenericAPIView,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    permission_classes = [AllowAny, ]
    queryset = Product.objects.all().order_by("-id")
    serializer_class=ProductSerializers
    lookup_field = "id"

    def get(self,request,id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)



class CatagoryViewset(viewsets.ViewSet):
    permission_classes = [AllowAny, ]
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



from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserSerializer


User = get_user_model()

# -------------------------
# User Registration
# -------------------------
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]  # Anyone can register

    def perform_create(self, serializer):
        user = serializer.save()
        # Create token for the user automatically after registration
        Token.objects.create(user=user)


# -------------------------
# User ViewSet (Profile)
# -------------------------
class UserViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def profile(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    









class MyCart(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        carts = Cart.objects.filter(customer=request.user)
        cart_serializer = CartSerializer(carts, many=True)

        all_data = []
        for cart in cart_serializer.data:
            cart_copy = dict(cart)  # ডাটার কপি নেওয়া
            cart_products = CartProduct.objects.filter(cart=cart["id"])
            cart_product_serializer = CartProductSerializer(cart_products, many=True)
            cart_copy["cartproduct"] = cart_product_serializer.data
            all_data.append(cart_copy)

        return Response({
            "user": UserSerializer(request.user).data,
            "cart": all_data
        })
