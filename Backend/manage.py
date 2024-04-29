#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
from visualise_dreams import settings
import sys
from dotenv import load_dotenv


def main():
    """Run administrative tasks."""
    dotenv_path = os.path.join(settings.BASE_DIR, '.env.local')
    load_dotenv(dotenv_path=dotenv_path)
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'visualise_dreams.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()