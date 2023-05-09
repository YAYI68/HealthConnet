from django.apps import AppConfig


class HcbConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'hcb'
    
    def ready(self) -> None:
        import hcb.signals
