import datetime
import random
from threading import Thread
import time
import json

import paho.mqtt.client as mqtt

# _______________TV_______________

BROKER_ADDRESS = "172.18.0.3"
BROKER_PORT = 1883

USERNAME = "root"
PASSWORD = "toor"

DEVICE_ID = 1

PUBLISH_MEASURMENT_TOPIC = "sensor/energy/consumption"
PUBLISH_STATUS_TOPIC = "sensor/energy/status"
SUBSCRIBE_TOPIC = "sensor/" + str(DEVICE_ID) + "/controller"


    
# ________________POWER MEASURMENT SERVICE________________
# Create JSON data
def generate_measurment():    
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
        case 3:
            consumption = random.uniform(120, 150)
            

    consumption = round(consumption, 3)
    
    measurement = { 'consumption': consumption ,
                    'device': DEVICE_ID ,
                    'timestamp': datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")}    # YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]
    
    return json.dumps(measurement)


# Publish data to the MQTT Broker
def publish_power_consumption(client):
    global power
    # Generate and publish power consumption data every 1 seconds
    while(1):
        time.sleep(1)
        if power == "ON":
            measurment = generate_measurment()
            # print("Publishing: ", measurment)
            client.publish(PUBLISH_MEASURMENT_TOPIC, measurment, qos=1, retain=False)
# ________________________________________________________




# _________________DEVICE STATUS SERVICE_________________
def report_status(client):
    global power
    
    status = {'device': DEVICE_ID,
              'enabled': False,
              'timestamp': datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")}
    
    if power == 'ON':
        status['enabled']= True
    
    status_message = json.dumps(status)
    
    # print("Publishing: ", status)
    
    client.publish(PUBLISH_STATUS_TOPIC, status_message, qos=1, retain=False)
    pass


def publish_device_status(client):
    while(1):
        report_status(client)
        time.sleep(5)
    pass
# ________________________________________________________



def operate(client):
    power_measurement = Thread(target=publish_power_consumption, args=(client,))
    device_status = Thread(target=publish_device_status, args=(client,))
    
    power_measurement.start()
    device_status.start()

    pass



def on_log(client, userdata, level, buf):
    print("log: ",buf)
    pass




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

        report_status(client)

    
    
if __name__ == '__main__':
    
    global power
    power = "ON"
    
        
    # Create MQTT client instance
    client = mqtt.Client()

    
    
    # Set the on_message callback function
    client.on_message = on_message
    
    # set log callback function
    client.on_log = on_log
    
    # Authentication
    client.username_pw_set(USERNAME, PASSWORD)

    # Connect to MQTT broker
    client.connect(BROKER_ADDRESS, BROKER_PORT)

    # Subscribe to control topic
    client.subscribe(SUBSCRIBE_TOPIC)
    
    # Start the MQTT loop to receive messages
    client.loop_start()

    # Start publishing power consumption data
    # publish_power_consumption(client)
    
    operate(client)