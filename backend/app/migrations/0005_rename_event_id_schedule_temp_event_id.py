# Generated by Django 4.2.11 on 2024-03-24 18:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_remove_schedule_prep_activities_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='schedule',
            old_name='event_id',
            new_name='temp_event_id',
        ),
    ]
