from django.contrib import admin
from .models import Space, Device, Measurement

admin.site.register(Measurement)
admin.site.register(Device)
admin.site.register(Space)
