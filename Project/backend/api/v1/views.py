from rest_framework import generics

from .models import Space, Device, Measurment
from .serializers import SpaceSerializer, DeviceSerializer, MeasurmentSerializer

# __________________Space__________________
class SpaceList(generics.ListCreateAPIView):
    serializer_class = SpaceSerializer
    queryset = Space.objects.all()
    

class SpaceDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SpaceSerializer
    queryset = Space.objects.all()


# __________________Device__________________
class DeviceList(generics.ListCreateAPIView):
    serializer_class = DeviceSerializer
    queryset = Device.objects.all()
    
    
class DeviceDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DeviceSerializer
    queryset = Device.objects.all()


# __________________Measurment__________________
class MeasurmentList(generics.ListCreateAPIView):
    serializer_class = MeasurmentSerializer
    queryset = Measurment.objects.all()    
    

class MeasurmentDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MeasurmentSerializer
    queryset = Measurment.objects.all()
    
