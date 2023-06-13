from rest_framework import serializers
from .models import Space, Device, Measurement


class MeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurement
        fields = '__all__'


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['id', 'created', 'alias', 'connected', 'enabled', 'listeningTopic', 'space']


class SpaceSerializer(serializers.ModelSerializer):
    devices = DeviceSerializer(many=True, read_only=True)
    
    class Meta:
        model = Space
        fields = '__all__'


class NestSpaceSerializer(serializers.ModelSerializer):
    device = DeviceSerializer(many=True, read_only=True)
    
    class Meta:
        model = Space
        fields = ['id', 'name', 'device']