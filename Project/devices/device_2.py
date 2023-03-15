
import time
import requests
import random


# headers = {'content-type': 'application/json'}
url = 'http://172.18.0.3:8000/api/measurments/'
device_id = 9
consumption = random.uniform(36, 43)

while(1):
 
    choice = random.choices([1, 2, 3], weights=(55, 40, 5), k=1)
    

    match choice[0]:
    
        # standby mode
        case 1:
            consumption = random.uniform(5, 12)
        
        #  normal mode  
        case 2:
            consumption = random.uniform(25, 36)
    
        #  max mode 
        case 2:
            consumption = random.uniform(36, 43)

         
    consumption = round(consumption, 2)
        
    measurement = { "consumption": consumption , "device": device_id }
            
    
    print(measurement)

    response = requests.post(url, measurement)
    print (response)
    
    time.sleep(5)