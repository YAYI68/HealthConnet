# Generated by Django 3.2.15 on 2023-05-18 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hcb', '0017_blog'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='image',
            field=models.ImageField(blank=True, default='default.jpg', null=True, upload_to='blog'),
        ),
    ]
