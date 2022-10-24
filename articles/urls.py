from django.urls import path
from .views import ArticleListAPIView, ArticleDetailAPIView, AuthorArticleListAPIView, AdminArticleListAPIView


app_name = 'articles'

urlpatterns = [
    path('articles/', ArticleListAPIView.as_view(), name='article_list'),
    path('articles/<int:pk>/', ArticleDetailAPIView.as_view(), name='article_detail'),
    path('articles/user/', AuthorArticleListAPIView.as_view(), name='user_articles'),
    path('articles/admin/', AdminArticleListAPIView.as_view(), name='admin_articles'),
]
