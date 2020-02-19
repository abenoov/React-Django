from rest_framework import serializers
from order.models import Order,OrderItem
from django.contrib.auth import get_user_model

User = get_user_model()
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("id", "user", "date", "status")

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ("id", "order", "product", "amount")
