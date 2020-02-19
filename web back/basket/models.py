from django.db import models
from django.contrib.auth import get_user_model
from shop.models import Product
User = get_user_model()


class BasketItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True)
    amount = models.IntegerField(default=1)