from django.db.models.signals import post_save
from django.dispatch import receiver
from api.models import Measurement
from api.models import Device
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


# This signal forward the data of the incoming current measurment from MQTT broker to socket 
@receiver(post_save, sender=Measurement)
def sentMeasurment(sender, instance, created, **kwargs):
    

    if created :

        # get device channel
        channel_layer = get_channel_layer()
        device_group_name = str(instance.device.id)
              
        # make measurement message
        measurment = {"consumption": instance.consumption,
                      "device": instance.device.id,
                      "timestamp": str(instance.timestamp)}
        
        # bond method with data
        data = {
            "type": "broadcast_data",
            "message": measurment
        }
        
        # call channel
        async_to_sync(channel_layer.group_send)(device_group_name, data)
        
    pass

# This signal updates the listening topic of the device to a default topic
@receiver(post_save, sender=Device)
def setDeviceTopic(sender, instance, created, **kwargs):
        
    # Device topic with default value change to "sensor/[id]/controler"
    if instance.listeningTopic == "default":
        instance.listeningTopic = "sensor/" + str(instance.id) + "/controller"
        instance.save(update_fields=["listeningTopic"])
        
    # TODO: Sent socket message with the updated status (connected/enabled fields) if there is a change
    
    # get device channel
    channel_layer = get_channel_layer()
    device_group_name = str(instance.id)
    
    # make status message
    status = {  "device": instance.id,
                "connected": instance.connected,
                "enabled": instance.enabled}
    
    
    # bond method with data
    data = {
        "type": "broadcast_data",
        "message": status
    }
        
    # call channel
    async_to_sync(channel_layer.group_send)(device_group_name, data)
    
    pass