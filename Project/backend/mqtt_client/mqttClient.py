import json
from time import sleep
import paho.mqtt.client as mqtt
from rest_framework import status
from rest_framework.response import Response
import atexit

 


# Define MQTT broker address and port
MQTT_BROKER_ADDRESS = '172.18.0.3'
MQTT_BROKER_PORT = 1883

# Authentication
USERNAME = "root"
PASSWORD = "toor"

# Define topic to subscribe to

class Subscription:
    
    CLIENT_ID = "Device Manager Subscription server"
    TOPIC = "sensor/energy/consumption"
    
    def __init__(self, serializer):
        self.serializer = serializer
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
                print("Server is not running or the IP/Port is unreachable")
                sleep(5)


    def subscribe(self):
        def on_message(client, userdata, msg):
            print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")
            
            data = json.loads(msg.payload.decode())
            serializer = self.serializer(data=data)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            print("errors: ", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        self.client.subscribe(self.TOPIC)
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
            
            

class Publishment:
    
    def __init__(self, topic, message):
        self.topic = topic
        self.message = message

    def publishData(self):
    
        def on_connect(client, userdata, flags, rc):
                if(rc == 0):
                    print("Connected to MQTT Broker!")
                else:
                    print("Failed to connect, return code %d\n", rc)
                    

        client = mqtt.Client()        
        
        # Authentication
        client.username_pw_set(USERNAME, PASSWORD)
        
        client.on_connect = on_connect
        
        # Connect to MQTT broker
        client.connect(MQTT_BROKER_ADDRESS, MQTT_BROKER_PORT)
        
        # publish signal
        client.publish(self.topic, self.message, qos=0, retain=False)
    pass