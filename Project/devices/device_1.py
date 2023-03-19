import datetime
import random
import socket
import ssl
from threading import Thread
import time
import json

import paho.mqtt.client as mqtt



BROKER_ADDRESS = "172.18.0.3"
BROKER_PORT = 1883

USERNAME = "root"
PASSWORD = "toor"

PUBLISH_TOPIC = "sensor/energy/consumption"
SUBSCRIBE_TOPIC = "sensor/TV/controller"


    
    
# Create JSON data
def generate_measurment():
    device_id = 1
    consumption = random.uniform(120, 150)
    choice = random.choices([1, 2, 3], weights=(80, 15, 5), k=1)

    match choice[0]:
        # eco mode
        case 1:
            consumption = random.uniform(50, 80)
        
        #  normal mode  
        case 2:
            consumption = random.uniform(80, 120)

        #  performance mode 
        case 2:
            consumption = random.uniform(120, 150)
            

   
    consumption = round(consumption, 3)
    measurement = { 'consumption': consumption ,
                    'device': device_id ,
                    'timestamp': datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")}    # YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]
    
    return json.dumps(measurement)

# Publish data to the MQTT Broker
def publish_power_consumption(client):
    global powerState

    # Generate and publish power consumption data every 5 seconds
    while(1):
        if powerState == "ON":
            measurment = generate_measurment()
            print("Publishing: ", measurment)
            client.publish(PUBLISH_TOPIC, measurment, qos=1, retain=True)

        time.sleep(1)

# Define function to handle incoming control messages
def on_message(client, userdata, message):
    global powerState
    # Extract the payload from the message
    payload = message.payload.decode()
    print(payload)

    # Check if the payload is 'ON' or 'OFF'
    if payload == 'ON':
        print('Turning device ON')
        powerState = "ON"


    elif payload == 'OFF':
        print('Turning device OFF')
        powerState = "OFF"
  
    
if __name__ == '__main__':
    
    global powerState
    
    # Create MQTT client instance
    client = mqtt.Client()

    powerState = "ON"
    
    
    # Set the on_message callback function
    client.on_message = on_message
    
    # Authentication
    client.username_pw_set(USERNAME, PASSWORD)

    # Connect to MQTT broker
    client.connect(BROKER_ADDRESS, BROKER_PORT)

    # Subscribe to control topic
    client.subscribe(SUBSCRIBE_TOPIC)
    
    # Start the MQTT loop to receive messages
    client.loop_start()

    # Start publishing power consumption data
    publish_power_consumption(client)