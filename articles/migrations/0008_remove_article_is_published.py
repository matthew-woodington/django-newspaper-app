# Generated by Django 4.1.2 on 2022-10-20 18:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0007_article_created_at_article_status_article_updated_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='is_published',
        ),
    ]
