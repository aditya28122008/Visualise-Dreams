# myapp/management/commands/create_groups.py
from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group

class Command(BaseCommand):
    def handle(self, *args, **options):
        # Define your groups here
        groups = ['Blogs', 'Elibrary', "UserAdmin"] 

        for group_name in groups:
            group, created = Group.objects.get_or_create(name=group_name)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Group "{group_name}" created successfully.'))
            else:
                self.stdout.write(self.style.WARNING(f'Group "{group_name}" already exists.'))
