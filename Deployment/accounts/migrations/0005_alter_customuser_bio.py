# Generated by Django 5.1 on 2024-08-19 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_alter_customuser_bannerimg_alter_customuser_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='bio',
            field=models.TextField(blank=True, default='Its About Me...!', max_length=200),
        ),
    ]
