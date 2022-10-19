from dataclasses import fields
from rest_framework import serializers

from . import models


class ArticleSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = models.Article
        fields = '__all__'
