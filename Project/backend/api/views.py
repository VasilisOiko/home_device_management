from django.http import Http404
from rest_framework import generics
from rest_framework.views import APIView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from .models import Space, Device, Measurment
from .serializers import SpaceSerializer, DeviceSerializer, MeasurmentSerializer

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

# returns model list
def getModels(Model, modelSerializer):
    serializer = modelSerializer(Model.objects.all(), many=True)
    return Response(serializer.data)


# post model
def postModel(request, modelSerializer):
    serializer = modelSerializer(data=request.data)
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


# __________________Space__________________
class SpaceList(APIView):
    
    def get(self, request, format=None):
        return getModels(Space, SpaceSerializer)


    def post(self, request, format=None):
        return postModel(request, SpaceSerializer)

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
        return getModels(Device, DeviceSerializer)

    def post(self, request, format=None):
        return postModel(request, DeviceSerializer)
    
    
class DeviceDetail(APIView):
    
    def get(self, request, pk, format=None):
        return getModel(Device, DeviceSerializer, pk)
        

    def put(self, request, pk, format=None):
        return putModel(Device, DeviceSerializer, request, pk)

    def delete(self, request, pk, format=None):
        return deleteModel(Device, pk)
        

# __________________Measurment__________________
class MeasurmentList(APIView):
    
    def get(self, request, format=None):
        return getModels(Measurment, MeasurmentSerializer)
    
    def post(self, request, format=None):
        return postModel(request, MeasurmentSerializer)
    

class MeasurmentDetail(APIView):
    
    def get(self, request, pk, format=None):
        return getModel(Measurment, MeasurmentSerializer, pk)
        

    def put(self, request, pk, format=None):
        return putModel(Measurment, MeasurmentSerializer, request, pk)

    def delete(self, request, pk, format=None):
        return deleteModel(Measurment, pk)
    
