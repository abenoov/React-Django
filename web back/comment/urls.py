from django.urls import path
from comment import views

urlpatterns = [
    path('comments/<int:product_id>', views.CommentListView.as_view()),
    path('comments/', views.CommentCreateView.as_view()),
]