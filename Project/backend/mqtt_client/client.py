import json
from threading import Thread
from time import sleep
import paho.mqtt.client as smp  #Simple Message Protocol

from devicemanagerserver.settings import MQTT_BROKER_ADDRESS, MQTT_BROKER_PORT, MQTT_USERNAME, MQTT_PASSWORD, MEASUREMENTS_TOPIC, STATUS_TOPIC
from mqtt_client.procedures import init_connectivity, read_measurement, read_status


class Client():
    
    MEASUREMENT_DATA_TOPIC = 1
    STATUS_DATA_TOPIC = 2
    
    def __init__(self, client_id):
        self.client = smp.Client(client_id) 

            
    def connect_to_broker(self, repeat = True) -> smp:
        
        # action on connection
        def display_connection_status(client, userdata, flags, rc):
            if(rc == 0):
                print("Connected to MQTT Broker!")
            else:
                print("Failed to connect, return code %d\n", rc)
                
            pass 

        self.client.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)
        self.client.on_connect = display_connection_status
        self.client.reconnect_delay_set(min_delay=5, max_delay=10)
        
        while True:
            try:
                self.client.connect(MQTT_BROKER_ADDRESS, MQTT_BROKER_PORT)
                break
            except ConnectionRefusedError:
                print("MQTT Broker is not running or the IP/Port is unreachable")
                sleep(5)
            if repeat == False:
                break
        pass
                
                
                
    # subscibe to topic
    def subscribe(self, topic):
        if topic == self.MEASUREMENT_DATA_TOPIC:
            self.client.subscribe(MEASUREMENTS_TOPIC)
            self.client.on_message = read_measurement
            
        elif topic == self.STATUS_DATA_TOPIC:
            self.client.subscribe(STATUS_TOPIC)
            self.client.on_message = read_status

           # set devices connectivity to False
            init_connectivity()
    
        else:
            print("[handlers/mqttClient/subscribe]: topic not exists")
              
        pass
    
    
    # publish a message
    def publish(self, topic, message):
        
        def on_publish(client, userdata, mid):
            print("mid: " + str(mid))
        
        # publish signal
        self.client.publish(topic, json.dumps(message), qos=0, retain=False)
        pass
    
    
    # start subscription
    def start(self):
        print("starting MQTT client...")
        self.client.loop_start()
      
      
     # disconnect from broker   
    def disconnect(self):
        def on_disconnect(client, userdata, rc):
            print("client disconnected ok")
        self.client.on_disconnect = on_disconnect
        self.client.disconnect()
        pass
        
    pass
