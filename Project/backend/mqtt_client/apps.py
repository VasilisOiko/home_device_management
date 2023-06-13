from django.apps import AppConfig
import paho.mqtt.client as mqtt


class MqttClientConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'mqtt_client'
    
            
    
    def ready(self):
        from .subscribing import Subscription
        from .handlers import mqttClient

        
        # subscribe to listen measurments 
        # self.client = Subscription()
        # self.client.startSubscription()
        
        
        
        # subscribe to devices measurement topic
        measurement_tracker = mqttClient("Measurement Tracker")
        
        measurement_tracker.connect_to_broker()
        
        measurement_tracker.subscribe(measurement_tracker.MEASUREMENT_DATA_TOPIC)
        
        measurement_tracker.start()
        
        # subscribe to devices status topic
        status_tracker = mqttClient("Status Tracker")
        
        status_tracker.connect_to_broker()
        
        status_tracker.subscribe(status_tracker.STATUS_DATA_TOPIC)
        
        status_tracker.start()
        
        # TODO: make device tracker
        pass
