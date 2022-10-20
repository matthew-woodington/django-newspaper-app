# Generated by Django 4.1.2 on 2022-10-20 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0006_article_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='article',
            name='status',
            field=models.CharField(choices=[('GR', 'General'), ('SP', 'Sports'), ('GM', 'Gaming'), ('FD', 'Food')], default='DR', max_length=2),
        ),
        migrations.AddField(
            model_name='article',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
