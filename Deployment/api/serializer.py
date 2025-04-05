from rest_framework import serializers
from blog.models import Post, Categories
from accounts.models import CustomUser
from Elibrary.models import Book, BookCategory
from django.contrib.auth.models import Group


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = "__all__"
        
class BookCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BookCategory
        fields = "__all__"


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


class BlogUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'profile', 'bannerImg', "bio", "Status", 'nickname']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'profile', 'bannerImg', "bio", 'nickname', 'email', 'groups', "is_superuser"]
class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'is_active', 'first_name', 'last_name', 'profile', 'bannerImg', "bio", 'nickname', 'email', 'groups', "Status", "is_superuser"]
class AdminUpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'is_active', 'first_name', 'last_name', 'profile', 'bannerImg', "bio", 'nickname', 'email', 'groups', "Status"]
class AdminSuperuserUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'is_active', 'first_name', 'last_name', 'profile', 'bannerImg', "bio", 'nickname', 'email', 'groups', "Status", "is_superuser"]
class AdminAddUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'is_active', 'first_name', 'last_name', 'email']
        extra_kwargs = {
            'password': {'write_only': True}  # Ensure password is write-only
        }


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["bio", 'nickname', 'bannerImg', 'profile']


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name', 'id']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"