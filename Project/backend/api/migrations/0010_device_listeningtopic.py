# Generated by Django 4.1.6 on 2023-03-18 10:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_measurment_timestamp'),
    ]

    operations = [
        migrations.AddField(
            model_name='device',
            name='listeningTopic',
            field=models.TextField(default='device/1/controler', max_length=50),
            preserve_default=False,
        ),
    ]