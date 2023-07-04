import json
from datetime import datetime, timedelta
from threading import Thread
from time import sleep
from django.utils import timezone

from api.serializers import MeasurementSerializer
from api.models import Device


# incoming measurements messages from subscription 
def read_measurement(client, userdata, msg):
    
    # get data from broket
    data = json.loads(msg.payload.decode())
    
    # match the fields of the object, to avoid extra-unknown
    measurement = {"consumption": data["consumption"],
                    "device": data["device"],
                    "timestamp": data["timestamp"]}
    
    # print("[handlers/get_measurements]:", measurement)
    
    # call the serializer and pass the data to database
    serializer = MeasurementSerializer(data=measurement)
    
    # save measurements in database
    if serializer.is_valid():
        serializer.save()
    pass


# incoming status messages from subscription 
def read_status(client, userdata, msg):
    
    # get data from broker
    data = json.loads(msg.payload.decode())
    
    status = {  "device": data["device"],
                "enabled": data["enabled"],
                "timestamp": data["timestamp"]}
    
    try:
        # find the device in database
        device = Device.objects.get(pk=status["device"])
                
        
        # update enabled field of device
        device.enabled = status["enabled"]
        device.connected = True
        device.lastStatusTimestamp = status["timestamp"]
                
        #save instance
        device.save()
        
        # create thread to check after 8 seconds if the status has changed
        track_device_connection = Thread(target=update_connectivity, args=(device.id, 8, ))
        #deploy thread
        track_device_connection.start()
        
    except Device.DoesNotExist:
        print("[mqttClient/procedures/read_status]: device does not exists", data)
    pass




def update_connectivity(id, delay):
    '''checks if the device update their status in past 8 seconds'''
    
    sleep(delay)
    
    # read from database as a new timestamp may registered 
    device = Device.objects.get(pk=id)
    
    #  get the current time
    current_time = timezone.now()    
    
    # checking case: last status may never occur
    if device.lastStatusTimestamp != None:
        
        # deviceTimestamp = datetime.strptime(str(device.lastStatusTimestamp), "%Y-%m-%d %H:%M:%S.%f%z")
        
        # read last status timestamp
        deviceTimestamp = device.lastStatusTimestamp
        
        # if device update the status in the last "delay" seconds keep the state
        if current_time - deviceTimestamp < timedelta(seconds=delay):
            return
            # __________case terminate function__________
        
    # change the state of the device as not connected    
    device.enabled = False
    device.connected = False
    device.save()
    
    pass


def init_connectivity():
    '''initialize all device connected status to false'''
            
    devices = Device.objects.all()
    
    for device in devices:           
        device.enabled = False
        device.connected = False
        device.save()
    
    print("Initialized devices connectivity to \"False\"")
    pass
