from rest_framework import serializers
from .models import Space, Device, Measurment

class SpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = '__all__'
    
class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = '__all__'
        
class MeasurmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurment
        fields = '__all__'
