# Generated by Django 4.2.11 on 2024-04-09 17:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schedule',
            name='note',
            field=models.TextField(blank=True, null=True),
        ),
    ]