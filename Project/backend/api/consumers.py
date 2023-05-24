from api.models import Device
from mqtt_client.mqttClient import Publishment

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
import json


def forwardMessage(id, data):
    
    message = json.loads(data)
    print("receive data:", message, "info about device: ", id) 
    
    device = Device.objects.get(pk=id)
    print("device", device.listeningTopic)

    mqtt_client = Publishment(device.listeningTopic, json.dumps(message))
    
    mqtt_client.publishData()
    pass



class DeviceLiveData(AsyncWebsocketConsumer):
    
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.device_group_name = None
        
    async def connect(self):
        
        self.device_group_name = self.scope["url_route"]["kwargs"]["id"]        
        
        
        await self.channel_layer.group_add(self.device_group_name, self.channel_name)
        
        await self.accept()
        print("accept connection | channel: ", self.device_group_name, self.channel_name)
        
        
        
        message = {"connected": False,
                      "enabled": False}
        

        await self.send(text_data=json.dumps({
            'message': message
        }))
        

        pass
        
    async def disconnect(self, code):
        print("disconnected from channel with code: ", code)
        
        
        await self.channel_layer.group_discard(self.device_group_name, self.channel_name)
        
        pass
    
    async def receive(self, text_data=None, bytes_data=None):
        
        message = json.loads(text_data)
        print("receive data:", message, "info about device: ", self.device_group_name) 
        
        
        device = await database_sync_to_async(Device.objects.get)(pk=self.device_group_name)
        print("device", device.listeningTopic)

        mqtt_client = Publishment(device.listeningTopic, json.dumps(message))
        
        mqtt_client.publishData()        
        
        pass
    
    async def broadcast_measurment(self, measurment):
        print("sending measurment via socket")
        await self.send(text_data=json.dumps({
            'message': measurment["message"]
        }))