from django.apps import AppConfig
import paho.mqtt.client as mqtt


class MqttClientConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'mqtt_client'
    
            
    
    def ready(self):
        from .client import Client
         
        
        # subscribe to devices measurement topic
        measurement_tracker = Client("Measurement Tracker")
        
        measurement_tracker.connect_to_broker()
        
        measurement_tracker.subscribe(measurement_tracker.MEASUREMENT_DATA_TOPIC)
        
        measurement_tracker.start()
        
        # subscribe to devices status topic
        status_tracker = Client("Status Tracker")
        
        status_tracker.connect_to_broker()
        
        status_tracker.subscribe(status_tracker.STATUS_DATA_TOPIC)
        
        status_tracker.start()
        
        pass
