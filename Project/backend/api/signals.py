from django.db.models.signals import post_save
from django.dispatch import receiver
from api.models import Measurment
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
import json


@receiver(post_save, sender=Measurment)
def sent_device_measurments(sender, instance, created, **kwargs):
    

    if created :

        channel_layer = get_channel_layer()
        device_group_name = str(instance.device.id)
        
  
        
        print("signal: ", type(instance))
        
        measurment = {"consumption": instance.consumption,
                      "device": instance.device.id, "timestamp": str(instance.timestamp)}
        
        data = {
            "type": "broadcast_measurment",
            "message": measurment
        }
        
        async_to_sync(channel_layer.group_send)(device_group_name, data)
        
    pass