# myapp/signals.py
from django.db.models.signals import post_migrate
from django.dispatch import receiver

@receiver(post_migrate)
def create_default_groups(sender, **kwargs):
    from django.core.management import call_command
    from django.apps import apps

    if sender.name == apps.get_app_config('serverStartupFunctions').name:
        call_command('create_groups')