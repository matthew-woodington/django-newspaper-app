from email.policy import default
from unittest.util import _MAX_LENGTH
from django.db import models
from django.conf import settings

# Create your models here.


class Article(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    title = models.CharField(max_length=225)
    body = models.TextField()
    image = models.ImageField(upload_to='articles/', null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

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

    DRAFT = 'DR'
    PUBLISHED = 'PB'
    SUBMITTED = 'SM'
    REJECTED = 'RJ'
    ARCHIVED = 'AR'
    STATUS_OF_ARTICLE = [
        (DRAFT, 'Draft'),
        (PUBLISHED, 'Published'),
        (SUBMITTED, 'Submitted'),
        (REJECTED, 'Rejected'),
        (ARCHIVED, 'Archived'),
    ]
    status = models.CharField(
        max_length=2,
        choices=STATUS_OF_ARTICLE,
        default=DRAFT,
    )

    def __str__(self):
        return self.title
