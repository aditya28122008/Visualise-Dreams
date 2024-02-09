from rest_framework import serializers
from blog.models import Post
from accounts.models import CustomUser
from Elibrary.models import Book
from django.contrib.auth.models import Group



class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"




class BlogUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'profile', 'bannerImg', "stuClass", "bio", "Status", 'nickname']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'profile', 'bannerImg', "bio", 'nickname', 'email', 'groups', "is_superuser"]

class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["bio", 'nickname', 'email', 'bannerImg', 'profile']


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"