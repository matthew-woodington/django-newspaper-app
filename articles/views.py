from rest_framework import generics
from articles import models
from . import models
from . import serializers
from django.db.models import Q
from .permissions import IsAdminOrReadOnly, IsAuthorOrReadOnly
from rest_framework.permissions import IsAuthenticated, IsAdminUser

# Create your views here.


class ArticleListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAdminOrReadOnly,)
    queryset = models.Article.objects.order_by('-created_at')
    serializer_class = serializers.ArticleSerializer

    def get_queryset(self):
        return models.Article.objects.filter(status='PB')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = models.Article.objects.all()
    serializer_class = serializers.ArticleSerializer


class AuthorArticleListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.ArticleSerializer

    def get_queryset(self):
        return models.Article.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class AdminArticleListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAdminUser,)
    queryset = models.Article.objects.order_by('-created_at')
    serializer_class = serializers.ArticleSerializer

    def get_queryset(self):
        return models.Article.objects.filter(Q(status='PB') | Q(status='SM') | Q(status='AR'))

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
