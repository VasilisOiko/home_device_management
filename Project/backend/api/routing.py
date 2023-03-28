from django.urls import re_path
from .consumers import DeviceLiveData

websocket_urlpatterns = [
    re_path('ws/stream/', DeviceLiveData.as_asgi())
]