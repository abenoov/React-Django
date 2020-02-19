from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from basket import serializers
from basket.models import BasketItem
from order.models import OrderItem,Order
from shop.models import Product
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import get_template
from django.template import Context


#does not work at all
#def email():
#   subject = 'Thank you for registering to our site'
#    email_from = settings.EMAIL_HOST_USER
#    recipient_list = ['lady.zazaza00@gmail.com',]
#    send_mail(subject, get_template('../emailtemplates/order.html').render(
#        Context({
#            'username': 'Zarina',
#            'password': 'zazaza00',
#            'full_name': 'ZarinaSyrymbet'
#    #   })
#    #), email_from, recipient_list)


#email()


class OrderCreateView(APIView):
    basket_serializers_class = serializers.BasketItemSerializer
    permission_classes = (IsAuthenticated, )

    def post(self, request, format=None):
        basket = BasketItem.objects.filter(user=request.user)
        basket_items = self.basket_serializers_class(basket, many=True)
        #вытаскиваем элемент

        if len(basket_items.data) > 0:
            order = Order(user=request.user, status=1)
            order.save()
            #создаем
            #баскет перекидываем на ордер

            for item in basket_items.data:
                order_item = OrderItem(order=order, product=Product.objects.get(pk=item.get('product')), amount=item.get('amount'))
                order_item.save()
            basket.delete()
           # email(request)
            return Response({"message": "success"}, status=200)

        return Response({"message": serializers.errors}, status=status.HTTP_400_BAD_REQUEST)