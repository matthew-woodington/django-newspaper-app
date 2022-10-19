from django.db import models
from django.conf import settings

# Create your models here.


class Article(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    title = models.CharField(max_length=225)
    body = models.TextField()
    # created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)

    GENERAL = 'GR'
    SPORTS = 'SP'
    GAMING = 'GM'
    FOOD = 'FD'
    CATEGORY_CHOICES = [
        (GENERAL, 'General'),
        (SPORTS, 'Sports'),
        (GAMING, 'Gaming'),
        (FOOD, 'Food'),
    ]
    category = models.CharField(
        max_length=2,
        choices=CATEGORY_CHOICES,
        default=GENERAL,
    )

    def __str__(self):
        return self.title
