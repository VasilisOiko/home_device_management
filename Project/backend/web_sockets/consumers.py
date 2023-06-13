from api.models import Device
from mqtt_client.publishing import Publishment

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
import json

# socket behavior
class DeviceLiveData(AsyncWebsocketConsumer):
    
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.device_group_name = None
        
    async def connect(self):
        
        # set the channel groupname as the id of the device
        self.device_group_name = self.scope["url_route"]["kwargs"]["id"]
        
        # add this groupname in channels
        await self.channel_layer.group_add(self.device_group_name, self.channel_name)
        
        # accepts connection
        await self.accept()
        print("accept connection | channel: ", self.device_group_name, self.channel_name)
        
        # initialize the status of the device on connect
        message = {"connected": False,
                      "enabled": False}
        
        # sent the message
        await self.send(text_data=json.dumps({
            'message': message
        }))
        pass
        
    async def disconnect(self, code):
        print("disconnected from channel with code: ", code)
        
        await self.channel_layer.group_discard(self.device_group_name, self.channel_name)
        
        pass
    
    # recieving data from UI or user
    async def receive(self, text_data=None, bytes_data=None):
        
        
        message = json.loads(text_data)
        print("receive data:", message, "info about device: ", self.device_group_name) 
        
        # from the incoming data, extracting the id and do a query to get the device(that the message targets to)
        device = await database_sync_to_async(Device.objects.get)(pk=self.device_group_name)
        print("device", device.listeningTopic)

        # create a publishment
        mqtt_client = Publishment(device.listeningTopic, json.dumps(message))
        
        mqtt_client.publishData()        
        
        pass
    
    async def broadcast_data(self, device):
        print("sending device data via socket")
        await self.send(text_data=json.dumps({
            'message': device["message"]
        }))