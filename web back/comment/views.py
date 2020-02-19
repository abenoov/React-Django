from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from comment import serializers
from comment.models import Comment
from rest_framework.permissions import IsAuthenticated


class CommentListView(APIView):
    serializers_class = serializers.CommentSerializer

    def get(self, request, product_id, format=None):
        comments = Comment.objects.select_related('user').filter(product=product_id)
        # .select_related('user'). left join
        serializer = self.serializers_class(comments, many=True)
        return Response(serializer.data)

    def delete(self, request, product_id, format=None):
        content = {
            'status': 'Not Found'
        }
        try:
            basket_item = Comment.objects.get(pk=product_id)
            basket_item.delete()
            return Response(content, status=200)
        except Comment.DoesNotExist:
            return Response({"message": serializers.errors}, status=status.HTTP_404_NOT_FOUND)



class CommentCreateView(APIView):
    serializers_class = serializers.CommentSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        serializer = self.serializers_class(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            # знает кто будет отправлять, кто делает запрос
            return Response(serializer.data)
        else:
            return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


