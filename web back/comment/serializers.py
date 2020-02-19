from rest_framework import serializers
from comment.models import Comment
from user.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = ("id", "text", "user", "product", "date")