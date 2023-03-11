from django.contrib import admin
from .models import Space, Device, Measurment

admin.site.register(Measurment)
admin.site.register(Device)
admin.site.register(Space)
