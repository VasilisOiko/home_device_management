import datetime
from django.db import models
import json

class Space(models.Model):
    name = models.TextField(max_length=100)

    def __str__(self):
        return self.name

     
class Device(models.Model):
    created = models.DateTimeField(auto_now_add=True, editable=False)
    alias = models.TextField(max_length=100)
    connected = models.BooleanField(default=True, editable=False)
    enabled = models.BooleanField(default=False, editable=False)
    listeningTopic = models.TextField(max_length=50)
    space = models.ForeignKey(Space, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.alias
    
    
class Measurment(models.Model):
    timestamp = models.DateTimeField()
    consumption = models.FloatField()
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    valid = models.BooleanField(default=True, editable=False)
    
    def __str__(self):
        return json.dumps({'consumption': self.consumption, 'device': self.device.id, 'timestamp': str(self.timestamp)})