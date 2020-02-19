from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
from shop.models import Product

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True, blank=True)
    status = models.IntegerField(default=1)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, blank=True, null=True, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True)
    amount = models.IntegerField(default=1)
