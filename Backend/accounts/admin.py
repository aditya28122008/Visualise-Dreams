from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
# Register your models here.

class CustomUserAdmin(UserAdmin):
   list_display = (
        'username', 'email', 'first_name', 'last_name', 'is_staff',
        'is_authenticated',
        )
   fieldsets = (
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'email', 'username', 'password','profile', 'bannerImg', 'schoolarNo_TIDNO', 'Status', 'bio', 'nickname')
        }),
        ('Permissions', {
            'fields': (
                'is_active', 'is_staff', 'is_superuser',
                'groups', 'user_permissions'
            )
        }),
    )
   add_fieldsets = (
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'email', 'username', 'password1', 'password2', 'schoolarNo_TIDNO', 'Status')
        }),
        ('Permissions', {
            'fields': (
                'is_active', 'is_staff', 'is_superuser',
                'groups', 'user_permissions'
                )
        }),
    )
admin.site.register(CustomUser, CustomUserAdmin)