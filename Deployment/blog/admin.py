from django.contrib import admin
from .models import Post, Categories
# Register your models here.

admin.site.register(Categories)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    class Media:
        js = ('script/tinyInject.js',)