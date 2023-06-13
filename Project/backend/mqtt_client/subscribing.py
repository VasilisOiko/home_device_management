import json
from time import sleep
import paho.mqtt.client as mqtt
from rest_framework import status
from rest_framework.response import Response

from api.serializers import MeasurementSerializer, DeviceSerializer
from api.models import Device


# Define MQTT broker address and port
MQTT_BROKER_ADDRESS = '172.18.0.3'
MQTT_BROKER_PORT = 1883

# Authentication
USERNAME = "root"
PASSWORD = "toor"

class Subscription:
    
    CLIENT_ID = "Device Manager Subscription server"
    DATA_TOPIC = "sensor/energy/consumption"
    
    def __init__(self):
        self.client = mqtt.Client(self.CLIENT_ID)    
    
    
    
    def connect_to_broker(self) -> mqtt:
        def on_connect(client, userdata, flags, rc):
            if(rc == 0):
                print("Connected to MQTT Broker!")
            else:
                print("Failed to connect, return code %d\n", rc)
                
        self.client.username_pw_set(USERNAME, PASSWORD)
        self.client.on_connect = on_connect
        self.client.reconnect_delay_set(min_delay=5, max_delay=10)
        
        while True:
            try:
                self.client.connect(MQTT_BROKER_ADDRESS, MQTT_BROKER_PORT)
                break
            except ConnectionRefusedError:
                print("MQTT Broker is not running or the IP/Port is unreachable")
                sleep(5)




    # update device fields according to received data
    def updateDevice(self, data):
        
        # search the device where coming from 
        device = Device.objects.filter(pk=data["device"])
        
        
        if (data["power"] == "OFF"):
            status = False
        else:
            status = True
        
        
        # update "enabled" status
        if(device.values("enabled")[0]["enabled"] != status):
            device.update(enabled=status)


    # subscribe to topic, receive data and after update device fields, post them to database
    def subscribe(self):
        def on_message(client, userdata, msg):
            # get data from broket
            data = json.loads(msg.payload.decode())
            
            # update device
            self.updateDevice(data)
            
            measurment = {"consumption": data["consumption"],
                           "device": data["device"],
                           "timestamp": data["timestamp"]}
            
            # call the serializer and pass the data to database
            serializer = MeasurementSerializer(data=measurment)
            if serializer.is_valid():
                serializer.save()
                
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            print("errors: ", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
           
           
            
        self.client.subscribe(self.DATA_TOPIC)
        self.client.on_message = on_message
        
        
        
        
    def startSubscription(self):
        print("starting MQTT client...")
        self.connect_to_broker()
        self.subscribe()
        self.client.loop_start()

        
        
        
    def stopSubscription(self):
        print("Stopping MQTT Client...")
        self.client.loop_stop()



    def exit_handler(self):
        if(self.client.is_loop_running()):
            self.client.loop_stop()
