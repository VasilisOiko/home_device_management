import paho.mqtt.client as mqtt

# Define MQTT broker address and port
MQTT_BROKER_ADDRESS = '172.18.0.3'
MQTT_BROKER_PORT = 1883

# Authentication
USERNAME = "root"
PASSWORD = "toor"


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
                    
        def on_publish(client, userdata, mid):
            print("mid: " + str(mid))
                    

        client = mqtt.Client()        
        
        # Authentication
        client.username_pw_set(USERNAME, PASSWORD)
        
        client.on_connect = on_connect
        
        # Connect to MQTT broker
        client.connect(MQTT_BROKER_ADDRESS, MQTT_BROKER_PORT)
        
        # publish signal
        client.publish(self.topic, self.message, qos=0, retain=False)
    pass