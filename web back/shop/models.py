
from django.db import models
import time


class Category(models.Model):
    category = models.CharField(max_length=255)


def upload_product(instance, filename):
    lastDot = filename.rfind('.')
    extension = filename[lastDot:len(filename):1]
    return 'images/product/%s-%s-%s' % (instance.name, time.time(), extension)


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=5000)
    price = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)
    img = models.FileField(upload_to=upload_product, blank=True, null=True)