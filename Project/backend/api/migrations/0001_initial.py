# Generated by Django 4.1.6 on 2023-02-20 12:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Device',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('created', models.DateTimeField()),
                ('alias', models.TextField(max_length=100)),
                ('connected', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Space',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.TextField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Reading',
            fields=[
                ('timestamp', models.DateTimeField(primary_key=True, serialize=False)),
                ('consumption', models.FloatField()),
                ('deviceReading', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.device')),
            ],
        ),
        migrations.AddField(
            model_name='device',
            name='deviceSpace',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.space'),
        ),
    ]