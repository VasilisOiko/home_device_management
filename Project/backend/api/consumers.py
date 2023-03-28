from channels.generic.websocket import AsyncWebsocketConsumer
import json

class DeviceLiveData(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({
            'type': 'connection establish',
            'message': 'You are now connected'
        }))
        # return await super().connect()
        pass
        
    async def disconnect(self, code):
        print("disconnected from channel with code: {code}")
        # return await super().disconnect(code)
        pass
    
    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        print("receive data: {text_data_json}")
        # return await super().receive(text_data, bytes_data)
        pass
    
    async def send_measurment(self, measurment):
        await self.send(text_data=measurment)