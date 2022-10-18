from django.urls import path
from .views import ArticleListAPIView


app_name = 'articles'

urlpatterns = [
    path('', ArticleListAPIView.as_view(), name='article_list'),
]