import datetime
import random
from threading import Thread
import time
import json

import paho.mqtt.client as mqtt



BROKER_ADDRESS = "172.18.0.3"
BROKER_PORT = 1883

USERNAME = "root"
PASSWORD = "toor"

PUBLISH_TOPIC = "sensor/energy/consumption"
SUBSCRIBE_TOPIC = "sensor/fridge/controller"

DEVICE_ID = 2



# Create JSON data
def generate_measurment():
    global power
    consumption = random.uniform(36, 43)

    if power == "OFF":
        choice = 0
    else:
        choice = random.choices([1, 2, 3], weights=(55, 40, 5), k=1)
        
        
    match choice:
        # off
        case 0:
            consumption = 0
        # eco mode
        case 1:
            consumption = random.uniform(5, 12)
        
        #  normal mode  
        case 2:
            consumption = random.uniform(25, 36)

        #  performance mode 
        case 3:
            consumption = random.uniform(36, 43)
            

    consumption = round(consumption, 3)
    measurement = { 'consumption': consumption ,
                    'device': DEVICE_ID ,
                    'timestamp': datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ"),
                    'power': power}    # YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]

    return json.dumps(measurement)




# Publish data to the MQTT Broker
def publish_power_consumption(client):
    # Generate and publish power consumption data every 5 seconds
    while(1):
        measurment = generate_measurment()
        print("Publishing: ", measurment)
        client.publish(PUBLISH_TOPIC, measurment, qos=1, retain=True)
        time.sleep(1)





# Define function to handle incoming control messages
def on_message(client, userdata, message):
    global power
    # Extract the payload from the message
    message = json.loads(message.payload.decode())
    print(message)

    if "power" in message:
        # signal the device to be disabled
        if message["power"] == 'ON':
            print('Turning device ON')
            power = "ON"

        elif message["power"] == 'OFF':
            print('Turning device OFF')
            power = "OFF"
    



if __name__ == '__main__':

    global power
    power = "ON"

        
    # Create MQTT client instance
    client = mqtt.Client()



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