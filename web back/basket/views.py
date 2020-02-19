from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from basket import serializers
from basket.models import BasketItem
from rest_framework.permissions import IsAuthenticated
from shop.models import Product


class BasketView(APIView):

    serializers_class = serializers.BasketItemSerializer
    permission_classes = (IsAuthenticated, )

    def get(self, request, format=None):
        baskets = BasketItem.objects.select_related('product').filter(user=request.user)
        serializer = self.serializers_class(baskets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = self.serializers_class(data=request.data)
        if(serializer.is_valid()):
            try:
                basket_item = BasketItem.objects.get(user=request.user, product=serializer.validated_data.get('product'))
                basket_item.amount = basket_item.amount + serializer.validated_data.get('amount')
                basket_item.save()
                return Response(self.serializers_class(basket_item).data)
            except BasketItem.DoesNotExist:
               serializer.save(user=request.user, product = Product.objects.get(pk=request.data['product']))
            #знает кто будет отправлять, кто делает запрос
            return Response(serializer.data)
        else:
            return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class BasketDeleteView(APIView):

    serializers_class = serializers.BasketItemSerializer
    permission_classes = (IsAuthenticated, )

    def delete(self,request, pk, format=None):
        content = {
            'status': 'Not Found'
        }
        try:
            basket_item = BasketItem.objects.get(pk=pk)
            basket_item.delete()
            return Response(content, status=200)
        except BasketItem.DoesNotExist:
            return Response({"message": serializers.errors}, status=status.HTTP_404_NOT_FOUND)