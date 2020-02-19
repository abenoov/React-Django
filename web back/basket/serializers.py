from rest_framework import serializers
from basket.models import BasketItem
from shop.serializers import ProductSerializer


class BasketItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = BasketItem
        fields = ("id", "user", "product", "amount")