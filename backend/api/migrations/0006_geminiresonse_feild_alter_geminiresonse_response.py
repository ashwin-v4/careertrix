# Generated by Django 5.1.4 on 2024-12-21 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_geminiresonse'),
    ]

    operations = [
        migrations.AddField(
            model_name='geminiresonse',
            name='feild',
            field=models.CharField(default='null', max_length=100),
        ),
        migrations.AlterField(
            model_name='geminiresonse',
            name='response',
            field=models.CharField(max_length=755),
        ),
    ]
