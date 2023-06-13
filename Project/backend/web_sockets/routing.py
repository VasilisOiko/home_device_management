from django.urls import path, re_path

from .consumers import DeviceLiveData

websocket_urlpatterns = [
    path("livedata/device/<str:id>/", DeviceLiveData.as_asgi()),
    re_path(r"^livedata/device/(?P<id>\w+)/$", DeviceLiveData.as_asgi()),
]