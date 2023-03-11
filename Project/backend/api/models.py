import datetime
from django.db import models

class Space(models.Model):
    name = models.TextField(max_length=100)

    def __str__(self):
        return self.name

     
class Device(models.Model):
    created = models.DateTimeField(auto_now_add=True, editable=False)
    alias = models.TextField(max_length=100)
    connected = models.BooleanField(default=True, editable=False)
    space = models.ForeignKey(Space, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.alias
    
    
class Measurment(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True, editable=False)
    consumption = models.FloatField()
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    valid = models.BooleanField(default=True, editable=False)
    
    def __str__(self):
        return self.device.alias + " measurment @" + str(self.timestamp)
