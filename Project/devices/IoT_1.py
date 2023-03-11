
import requests
import datetime
import urllib3
from urllib import request, parse
import json


headers = {'content-type': 'application/json'}
url = 'http://172.18.0.2:8000/api/spaces/'

space = {
            "name": "kids bedroom"
        }

response = requests.post(url, space)

print (response)
