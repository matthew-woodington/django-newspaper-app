# Generated by Django 4.1.2 on 2022-10-21 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0008_remove_article_is_published'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='image',
            field=models.ImageField(null=True, upload_to='articles/'),
        ),
    ]
