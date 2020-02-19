from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from shop import serializers
from shop.models import Product, Category
from rest_framework.permissions import IsAdminUser, SAFE_METHODS
from django.db.models import Q


class IsAdminUserOrReadOnly(IsAdminUser):
    def has_permission(self, request, view):
        is_admin = super(
            IsAdminUserOrReadOnly,
            self).has_permission(request, view)
        return request.method in SAFE_METHODS or is_admin


class ProductViews(APIView):
    serializers_class = serializers.ProductSerializer
    permission_classes = (IsAdminUserOrReadOnly,)

    def get(self, request, format=None):
        products = Product.objects.all()
        serializer = self.serializers_class(products, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = self.serializers_class(data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ProductSearchViews(APIView):
    serializers_class = serializers.ProductSerializer

    def get(self, request, key, cat_id,  format=None):
        if cat_id ==0:
            products = Product.objects.filter(Q(name__contains=key) | Q(price__contains=key) | Q(category__category__contains=key)| Q(category_id=key))
        else:
            products = Product.objects.filter(
                Q(name__contains=key) | Q(price__contains=key) | Q(category__category__contains=key) | Q(
                    category_id=key))
        serializer = self.serializers_class(products, many=True)
        return Response(serializer.data)


class ProductDetailViews(APIView):
    serializers_class = serializers.ProductSerializer
    permission_classes = (IsAdminUserOrReadOnly,)

    def get_queryset(self, pk):
        try:
            products = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return False
        return products

    def put(self, request, pk, format=None):
        products = self.get_queryset(pk)

        if not products:
            content = {
                'status': 'Not Found'
            }
            return Response({"message": serializers.errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializers_class(products, data=request.data)

        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk, format=None):
        products = self.get_queryset(pk)
        if not products:
            content = {
                'status': 'Not Found'
            }
            return Response({"message": serializers.errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializers_class(products)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        products = self.get_queryset(pk)

        if not products:
            content = {
                'status': 'Not Found'
            }
            return Response({"message": serializers.errors}, status=status.HTTP_400_BAD_REQUEST)
        products.delete()
        return Response({'message': 'No content'}, status=status.HTTP_204_NO_CONTENT)


# Create your views here.

class CategoryViews(APIView):
    serializers_class = serializers.CategorySerializer
    permission_classes = (IsAdminUserOrReadOnly,)

    def get(self, request, format=None):
        categories = Category.objects.all()
        serializer = self.serializers_class(categories, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = self.serializers_class(data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetailViews(APIView):
    serializers_class = serializers.CategorySerializer
    permission_classes = (IsAdminUserOrReadOnly,)

    def get_queryset(self, pk):
        try:
            categories = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return False
        return categories

    def put(self, request, pk, format=None):
        categories = self.get_queryset(pk)

        if not categories:
            content = {
                'status': 'Not Found'
            }
            return Response({"message": serializers.errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializers_class(categories, data=request.data)

        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk, format=None):
        categories = self.get_queryset(pk)
        if not categories:
            content = {
                'status': 'Not Found'
            }
            return Response({"message": serializers.errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializers_class(categories)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        categories = self.get_queryset(pk)

        if not categories:
            content = {
                'status': 'Not Found'
            }
            return Response({"message": serializers.errors}, status=status.HTTP_400_BAD_REQUEST)
        categories.delete()
        return Response({'message': 'No content'}, status=status.HTTP_204_NO_CONTENT)
