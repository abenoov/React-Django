from django.urls import path
from shop import views

urlpatterns = [
    path('products/', views.ProductViews.as_view()),
    path('products/<int:pk>', views.ProductDetailViews.as_view()),
    path('products/<str:key>/search', views.ProductSearchViews.as_view()),
    path('categories/', views.CategoryViews.as_view()),
    path('categories/<int:pk>', views.CategoryDetailViews.as_view())
]