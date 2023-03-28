from django.apps import AppConfig
from threading import Thread
from .mqttClient import Subscription


class MqttClientConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'mqtt_client'
    
    
    def startMQTTClient(self):
        from api.serializers import MeasurmentSerializer, DeviceSerializer
        from api.views import searchModel
        from api.models import Device
        
        self.client = Subscription(serializer = MeasurmentSerializer,
                                   deviceModel=Device,
                                   deviceSerializer= DeviceSerializer,
                                   searchDevice=searchModel)
        self.client.startSubscription()
            
    
    def ready(self):
        mqtt_client = Thread(target=self.startMQTTClient)
        mqtt_client.start()
        pass
