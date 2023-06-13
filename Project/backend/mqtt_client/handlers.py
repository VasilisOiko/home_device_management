import json
from time import sleep
import paho.mqtt.client as smp

from devicemanagerserver.settings import MQTT_BROKER_ADDRESS, MQTT_BROKER_PORT, MQTT_USERNAME, MQTT_PASSWORD, MEASUREMENTS_TOPIC, STATUS_TOPIC
from api.serializers import MeasurementSerializer, DeviceSerializer
from api.models import Device

# TODO: 
#   MAKE BASE TOPIC LIKE -> sensor/[id] 
#   AND THEN SPLIT THE TOPIC ON CONSUMPTION AND STATUS
#
# SPLIT on_message METHOD FOR EACH TOPIC



class mqttClient():
    
    MEASUREMENT_DATA_TOPIC = 1
    STATUS_DATA_TOPIC = 2
    
    def __init__(self, client_id):
        self.client = smp.Client(client_id) 

            
         
            
            
            
    def connect_to_broker(self) -> smp:
                
        # action on connection
        def on_connect(client, userdata, flags, rc):
            if(rc == 0):
                print("Connected to MQTT Broker!")
            else:
                print("Failed to connect, return code %d\n", rc)
                
            pass    
        
        
        
        self.client.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)
        self.client.on_connect = on_connect
        self.client.reconnect_delay_set(min_delay=5, max_delay=10)
        
        while True:
            try:
                self.client.connect(MQTT_BROKER_ADDRESS, MQTT_BROKER_PORT)
                break
            except ConnectionRefusedError:
                print("MQTT Broker is not running or the IP/Port is unreachable")
                sleep(5)
        pass
                
                
                

    def subscribe(self, topic):
        if topic == self.MEASUREMENT_DATA_TOPIC:
            self.client.subscribe(MEASUREMENTS_TOPIC)
            self.client.on_message = get_measurements
            
        elif topic == self.STATUS_DATA_TOPIC:
            self.client.subscribe(STATUS_TOPIC)
            self.client.on_message = get_status
            
        else:
            print("[handlers/mqttClient/subscribe]: topic not exists")
              
        pass
    
    def start(self):
        print("starting MQTT client...")
        self.client.loop_start()
        
    pass
        
        
        
        
        
# incoming measurements messages from subscription 
def get_measurements(client, userdata, msg):
    
    # get data from broket
    data = json.loads(msg.payload.decode())
    
    # match the fields of the object, to avoid extra-unknown
    measurement = {"consumption": data["consumption"],
                    "device": data["device"],
                    "timestamp": data["timestamp"]}
    
    print("[handlers/get_measurements]:", measurement)
    
    # call the serializer and pass the data to database
    serializer = MeasurementSerializer(data=measurement)
    
    # save measurements in database
    if serializer.is_valid():
        serializer.save()

    pass

# incoming status messages from subscription 
def get_status(client, userdata, msg):
    # get data from broket
    data = json.loads(msg.payload.decode())
    
    status = {  "device": data["device"],
                "enabled": data["enabled"]}
    
    # find the device in database
    device = Device.objects.get(pk=status["device"])
    
    print("[handlers/get_status] device pre status:", device, status)
    
    # update enabled field of device
    device.enabled = data["enabled"]
    
    print("[handlers/get_status] device post status:", device)
    #save instance
    device.save()
    

    pass


