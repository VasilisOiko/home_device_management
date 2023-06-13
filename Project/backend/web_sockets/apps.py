from django.apps import AppConfig


class WebSocketsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'web_sockets'
    
    def ready(self):
        from . import signals
        pass
