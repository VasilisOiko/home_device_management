from django.urls import path
from .views import NestSpaceList, SpaceList, SpaceDetail, DeviceList, DeviceDetail, MeasurementList, MeasurementDetail

urlpatterns = [
    path('spaces/all/', NestSpaceList.as_view()),
    
    path('spaces/', SpaceList.as_view()),
    path('spaces/<int:pk>/', SpaceDetail.as_view()),
    
    path('devices/', DeviceList.as_view()),
    path('devices/<int:pk>/', DeviceDetail.as_view()),
    
    path('measurements/', MeasurementList.as_view()),
    path('measurements/<int:pk>/', MeasurementDetail.as_view()),
    
]