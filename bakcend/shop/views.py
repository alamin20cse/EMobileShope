from rest_framework.response import Response
from rest_framework import views,viewsets,generics,mixins,filters
from .models import Product,Category,Cart,CartProduct,Order,Review
from .serializers import ProductSerializers,CatagorySerializer,UserSerializer,UserRegisterSerializer,CartSerializer,CartProductSerializer,OrderSerializer,ReviewSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.contrib.auth import get_user_model
 


class ProductView(generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    permission_classes = [AllowAny]
    queryset = Product.objects.all().order_by("-id")
    serializer_class = ProductSerializers
    lookup_field = "id"

    # Search filter
    filter_backends = [filters.SearchFilter]
    search_fields = ['title',]  # যেসব ফিল্ডে search হবে

    def get(self, request, id=None):
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
# 

#that is not need if use jwt
    def perform_create(self, serializer):
        user = serializer.save()
        # Create token for the user automatically after registration
        Token.objects.create(user=user)


# -------------------------
# User ViewSet (Profile)
# -------------------------
class UserViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
#GET /api/user/profile/
# api/router register name/functon name/
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


class OldOrders(viewsets.ViewSet):
    permission_classes = [AllowAny, ]

    def list(self, request):
        query = Order.objects.filter(cart__customer=request.user)
        serializers = OrderSerializer(query, many=True)
        all_data=[]
        for order in serializers.data:
            cartproduct = CartProduct.objects.filter(cart_id=order['cart']['id'])
            cartproduct_serializer = CartProductSerializer(cartproduct,many=True)
            order['cartproduct'] = cartproduct_serializer.data
            all_data.append(order)
        return Response(all_data)
    def retrieve(self,request,pk=None):
        try:
            queryset = Order.objects.get(id=pk)
            serializers = OrderSerializer(queryset)
            data = serializers.data
            all_date=[]
            cartproduct = CartProduct.objects.filter(cart_id=data['cart']['id'])
            cartproduct_serializer = CartProductSerializer(cartproduct,many=True)
            data['cartproduct'] = cartproduct_serializer.data
            all_date.append(data)
            response_message = {"error":False,"data":all_date}
        except:
            response_message = {"error":True,"data":"No data Found for This id"}

        return Response(response_message)
    
    
    def destroy(self,request,pk=None):
        try:
            order_obj=Order.objects.get(id=pk)
            cart_obj = Cart.objects.get(id=order_obj.cart.id)
            order_obj.delete()
            cart_obj.delete()
            responsemessage = {"erroe":False,"message":"Order delated","order id":pk}
        except:
            responsemessage = {"erroe":True,"message":"Order Not Found"}
        return Response(responsemessage)
    

    def update(self, request, pk=None):  # PUT
        try:
            order = Order.objects.get(id=pk)
        except Order.DoesNotExist:
            return Response({"error": True, "message": "Order not found"}, status=404)

        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"error": False, "data": serializer.data})
        return Response({"error": True, "errors": serializer.errors}, status=400)

    def partial_update(self, request, pk=None):  # PATCH
        try:
            order = Order.objects.get(id=pk)
        except Order.DoesNotExist:
            return Response({"error": True, "message": "Order not found"}, status=404)

        serializer = OrderSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"error": False, "data": serializer.data})
        return Response({"error": True, "errors": serializer.errors}, status=400)
    


    def create(self,request):
        cart_id = request.data["cartId"]
        cart_obj = Cart.objects.get(id=cart_id)
        address = request.data["address"]
        mobile = request.data["mobile"]
        email = request.data["email"]
        cart_obj.complit=True
        cart_obj.save()
        created_order = Order.objects.create(
            cart=cart_obj,
            address=address,
            mobile=mobile,
            email=email,
            total=cart_obj.total,
            discount=3,
            order_status="Order Received"
        )

        return Response({"message":"order Resebed","cart id":cart_id,"order id":created_order.id})



class AddtoCartView(views.APIView):
    permission_classes=[IsAuthenticated, ]
  
    
    def post(self,request):
        product_id = request.data['id']
        product_obj = Product.objects.get(id=product_id)
        # print(product_obj,"product_obj")        
        cart_cart = Cart.objects.filter(customer=request.user).filter(complit=False).first()
        cart_product_obj = CartProduct.objects.filter(product__id=product_id).first()
        
        try:
            if cart_cart:
                # print(cart_cart)
                # print("OLD CART")
                this_product_in_cart = cart_cart.cartproduct_set.filter(product=product_obj)
                if this_product_in_cart.exists():
                    # print("OLD CART PRODUCT--OLD CART")
                    cartprod_uct = CartProduct.objects.filter(product=product_obj).filter(cart__complit=False).first()
                    cartprod_uct.quantity +=1
                    cartprod_uct.subtotal +=product_obj.selling_price
                    cartprod_uct.save()
                    cart_cart.total +=product_obj.selling_price
                    cart_cart.save()
                else:
                    # print("NEW CART PRODUCT CREATED--OLD CART")
                    cart_product_new=CartProduct.objects.create(
                        cart = cart_cart,
                        price  =product_obj.selling_price,
                        quantity = 1,
                        subtotal = product_obj.selling_price
                    )
                    cart_product_new.product.add(product_obj)
                    cart_cart.total +=product_obj.selling_price
                    cart_cart.save()
            else:
                # print(cart_cart)
                # print("NEW CART CREATED")
                Cart.objects.create(customer=request.user,total=0,complit=False)
                new_cart = Cart.objects.filter(customer=request.user.profile).filter(complit=False).first()
                cart_product_new=CartProduct.objects.create(
                        cart = new_cart,
                        price  =product_obj.selling_price,
                        quantity = 1,
                        subtotal = product_obj.selling_price
                    )
                cart_product_new.product.add(product_obj)
                # print("NEW CART PRODUCT CREATED")    
                new_cart.total +=product_obj.selling_price
                new_cart.save()

            response_mesage = {'error':False,'message':"Product add to card successfully","productid":product_id}
        
        except:
            response_mesage = {'error':True,'message':"Product Not add!Somthing is Wromg"}

        return Response(response_mesage)
    



class UpdateCartProduct(views.APIView):
    permission_classes=[IsAuthenticated, ]
    
    def post(self,request):
        cp_obj = CartProduct.objects.get(id=request.data["id"])
        cart_obj = cp_obj.cart

        cp_obj.quantity +=1
        cp_obj.subtotal += cp_obj.price
        cp_obj.save()

        cart_obj.total += cp_obj.price
        cart_obj.save()
        return Response({"message":"CartProduct Add Update","product":request.data['id']})

class DecreaseCartProduct(views.APIView):
    permission_classes=[IsAuthenticated, ]
    
    def post(self,request):
        cp_obj = CartProduct.objects.get(id=request.data["id"])
        cart_obj = cp_obj.cart

        cp_obj.quantity -=1
        cp_obj.subtotal -= cp_obj.price
        cp_obj.save()

        cart_obj.total -= cp_obj.price
        cart_obj.save()
        if(cp_obj.quantity==0):
            cp_obj.delete()   
        return Response({"message":"CartProduct Add Update","product":request.data['id']})
    



class Delatecartproduct(views.APIView):
    permission_classes=[IsAuthenticated, ]
 
    def post(self,request):
        cp_obj = CartProduct.objects.get(id=request.data['id'])
        cp_obj.delete()        
        return Response({"message":"CartProduct Delated","product":request.data['id']})
    



class Delatefullcart(views.APIView):
    permission_classes=[IsAuthenticated, ]
    def post(self,request):
        try:
            card_obj = Cart.objects.get(id=request.data['id'])
            card_obj.delete()
            responsemessage = {"message":"Cart Delated"}
        except:
            responsemessage = {"message":"Somthing wright"}
        return Response(responsemessage)
    















from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import stripe
from django.conf import settings
from .models import Payment
from .serializers import PaymentSerializer
from datetime import datetime

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreatePaymentIntentView(APIView):
    def post(self, request):
        try:
            price = request.data.get('price')
            amount = int(float(price) * 100)  # Stripe expects cents
            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency='usd',
                payment_method_types=['card'],
            )
            return Response({'clientSecret': intent.client_secret})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class SavePaymentView(APIView):
    def post(self, request):
        data = request.data
        serializer = PaymentSerializer(data=data)
        if serializer.is_valid():
            serializer.save(date=datetime.now())
            return Response({'paymentResult': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PaymentListView(APIView):
    def get(self, request, email):
        payments = Payment.objects.filter(email=email)
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)








# for review part


class ReviewViewset(

    mixins.CreateModelMixin,     # POST
    mixins.ListModelMixin,       # GET (list)
    mixins.RetrieveModelMixin,   # GET (detail)
    mixins.DestroyModelMixin,    # DELETE
    mixins.UpdateModelMixin,     # PUT / PATCH (update)
    viewsets.GenericViewSet
):
    
    queryset=Review.objects.all()
    serializer_class=ReviewSerializer
    def perform_create(self, serializer):
        serializer.save(email=self.request.user.email) 
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:  # create, update, partial_update, destroy
            permission_classes = [IsAuthenticated,]
        return [permission() for permission in permission_classes]



# views.py
from rest_framework import generics
from .models import Review
from .serializers import ReviewSerializer

class ForSpecificProductReview(generics.ListAPIView):
    serializer_class = ReviewSerializer

    # Get reviews filtered by product_id from URL
    def get_queryset(self):
        product_id = self.kwargs.get('product_id')  # get product_id from URL
        return Review.objects.filter(product=product_id)  # filter reviews for this product




