
import time
import requests
import random


# headers = {'content-type': 'application/json'}
url = 'http://172.18.0.3:8000/api/measurments/'
device_id = 10
consumption = random.uniform(120, 150)

while(1):
 
    choice = random.choices([1, 2, 3], weights=(80, 15, 5), k=1)
    

    match choice[0]:
    
        # eco mode
        case 1:
            consumption = random.uniform(50, 80)
        
        #  noraml mode  
        case 2:
            consumption = random.uniform(80, 120)
    
        #  performance mode 
        case 2:
            consumption = random.uniform(120, 150)

         
    consumption = round(consumption, 2)
        
    measurement = { "consumption": consumption , "device": device_id }
            
    
    print(measurement)

    response = requests.post(url, measurement)
    print (response)
    
    time.sleep(5)