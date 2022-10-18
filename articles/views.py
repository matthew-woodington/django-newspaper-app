from rest_framework import generics

from articles import models

from . import models
from . import serializers

# Create your views here.


class ArticleListAPIView(generics.ListCreateAPIView):
    queryset = models.Article.objects.all()
    serializer_class = serializers.ArticleSerializer
