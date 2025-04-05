from rest_framework import permissions







class BlogPermission(permissions.BasePermission):
    """
    Custom permission to allow access only to superusers or users in a specific group.
    """

    def has_permission(self, request, view):
        return request.user.is_superuser or request.user.groups.filter(name='Blogs').exists()
class UserAdminPermission(permissions.BasePermission):
    """
    Custom permission to allow access only to superusers or users in a specific group.
    """

    def has_permission(self, request, view):
        return request.user.is_superuser or request.user.groups.filter(name='UserAdmin').exists()
    

class ElibraryPermission(permissions.BasePermission):
    """
    Custom permission to allow access only to superusers or users in a specific group.
    """

    def has_permission(self, request, view):
        return request.user.is_superuser or request.user.groups.filter(name='Elibrary').exists()