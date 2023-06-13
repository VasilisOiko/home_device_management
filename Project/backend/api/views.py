from django.http import Http404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response

from .models import Space, Device, Measurement
from .serializers import NestSpaceSerializer, SpaceSerializer, DeviceSerializer, MeasurementSerializer

# ______________HTTP Methods______________
# search a model using private key
def searchModel(Model, pk):
    try:
        return Model.objects.get(pk=pk)
    
    except Model.DoesNotExist:
        raise Http404    
       

# get model
def getModel(Model, modelSerializer, pk):
    model = searchModel(Model, pk)
    serializer = modelSerializer(model)
    
    return Response(serializer.data)


# post model
def postModel(data, modelSerializer):
    serializer = modelSerializer(data=data, many=False)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# put model
def putModel(Model, modelSerializer, request, pk):
    model = searchModel(Model, pk)
    serializer = modelSerializer(model, data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# delete model
def deleteModel(Model, pk):
    model = searchModel(Model, pk)
    model.delete()
    
    return Response(status=status.HTTP_204_NO_CONTENT)


# __________________Building(Space-Devices)__________________
class NestSpaceList(APIView):
    def get(self, request, format=None):
        spaces = Space.objects.all()
        serializer = NestSpaceSerializer(spaces, many=True)
        return Response(serializer.data)


# __________________Space__________________
class SpaceList(APIView):
    
    def get(self, request, format=None):
        spaces = Space.objects.all()
        serializer = SpaceSerializer(spaces, many=True)
        return Response(serializer.data)


    def post(self, request, format=None):
        return postModel(request.data, SpaceSerializer)

class SpaceDetail(APIView):

    def get(self, request, pk, format=None):
        return getModel(Space, SpaceSerializer, pk)

    def put(self, request, pk, format=None):
        return putModel(Space, SpaceSerializer, request, pk)

    def delete(self, request, pk, format=None):        
        return deleteModel(Space, pk)

# __________________Device__________________
class DeviceList(APIView):
    
    def get(self, request, format=None):
        devices = Device.objects.all()
        
        searchBySpace = self.request.query_params.get('space', None)
        
        if searchBySpace:
            devices = devices.filter(space=searchBySpace)
        
        serializer = DeviceSerializer(devices, many=True)
        
        return Response(serializer.data)
        

    def post(self, request, format=None):
        return postModel(request.data, DeviceSerializer)
    
    
    
class DeviceDetail(APIView):
    
    def get(self, request, pk, format=None):
        return getModel(Device, DeviceSerializer, pk)

    def put(self, request, pk, format=None):
        return putModel(Device, DeviceSerializer, request, pk)

    def delete(self, request, pk, format=None):
        return deleteModel(Device, pk)
        

# __________________Measurment__________________
class MeasurementList(APIView):
    
    def get(self, request, format=None):
        measurments = Measurement.objects.all()
    
        searchByParam = request.query_params.get("device", None)
                
        if searchByParam:
            measurments = measurments.filter(device=searchByParam)
            
        serializer = MeasurementSerializer(measurments, many=True)
        
        return Response(serializer.data)
    
    def post(self, request, format=None):
        return postModel(request.data, MeasurementSerializer)
    
    def delete(self, request, format=None):
        Measurement.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class MeasurementDetail(APIView):
    
    def get(self, request, pk, format=None):
        return getModel(Measurement, MeasurementSerializer, pk)
        

    def put(self, request, pk, format=None):
        return putModel(Measurement, MeasurementSerializer, request, pk)

    def delete(self, request, pk, format=None):
        return deleteModel(Measurement, pk)