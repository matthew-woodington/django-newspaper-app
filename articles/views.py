from rest_framework import generics
from articles import models
from . import models
from . import serializers
from .permissions import IsAuthorOrReadOnly

# Create your views here.


class ArticleListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = models.Article.objects.all()
    # queryset = models.Article.objects.order_by('-created_at')
    serializer_class = serializers.ArticleSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = models.Article.objects.all()
    serializer_class = serializers.ArticleSerializer
