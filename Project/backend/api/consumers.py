from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
import json

class DeviceLiveData(AsyncWebsocketConsumer):
    
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.device_group_name = None
        
    async def connect(self):
        
        self.device_group_name = self.scope["url_route"]["kwargs"]["id"]        
        
        # Join room group
        # async_to_sync(self.channel_layer.group_add)(
        #     self.device_group_name, self.channel_name
        # )
        
        
        await self.channel_layer.group_add(self.device_group_name, self.channel_name)
        
        await self.accept()
        print("accept connection | channel: ", self.device_group_name, self.channel_name)
        
        
        await self.send(text_data=json.dumps({
            'message': "ela re bro"
        }))
        

        pass
        
    async def disconnect(self, code):
        print("disconnected from channel with code: ", code)
        
        # async_to_sync(self.channel_layer.group_discard)(
        #     self.device_group_name, self.channel_name
        # )
        
        await self.channel_layer.group_discard(self.device_group_name, self.channel_name)
        
        pass
    
    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        print("receive data: {text_data_json}")
        pass
    
    async def broadcast_measurment(self, measurment):
        print("senting measurment via socket")
        await self.send(text_data=json.dumps({
            'message': measurment["message"]
        }))