from django.apps import AppConfig


class ServerstartupfunctionsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'serverStartupFunctions'
    
    
    def ready(self):
        import serverStartupFunctions.signals
