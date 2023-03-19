from django.urls import path
from .views import SpaceList, SpaceDetail, DeviceList, DeviceDetail, MeasurmentList, MeasurmentDetail

urlpatterns = [
    path('spaces/', SpaceList.as_view()),
    path('spaces/<int:pk>/', SpaceDetail.as_view()),
    
    path('devices/', DeviceList.as_view()),
    path('devices/<int:pk>/', DeviceDetail.as_view()),
    
    path('measurments/', MeasurmentList.as_view()),
    path('measurments/<int:pk>/', MeasurmentDetail.as_view()),
    
]