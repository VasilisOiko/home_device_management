from django.db import models

class Space(models.Model):
    name = models.TextField(max_length=100)

    def __str__(self):
        return self.name

     
class Device(models.Model):
    created = models.DateTimeField()
    alias = models.TextField(max_length=100)
    connected = models.BooleanField()
    space = models.ForeignKey(Space, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.alias
    
    
class Measurment(models.Model):
    timestamp = models.DateTimeField()
    consumption = models.FloatField()
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.timestamp
