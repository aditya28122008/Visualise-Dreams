from .serializer import BlogSerializer, BlogUserSerializer, UserSerializer, BookSerializer, UpdateProfileSerializer, GroupSerializer
from rest_framework.generics import ListAPIView
from datetime import datetime
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, permissions
import os
from visualise_dreams import settings
from blog.models import Post
from accounts.models import CustomUser as User
from django.contrib.auth.models import Group
from Elibrary.models import Book
from visualise_dreams import vars
from django.utils import timezone
from .pagination import BlogPaginations, AdminPostPaginations, SearchPagination

# Create your views here.

class IsSuperUserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser


class CheckGroupExists(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsSuperUserPermission]
    def get(self, request):
        group_names = ['Blogs', 'Elibrary']  # List of group names to check
        existing_groups = []
        non_existing_groups = []

        for group_name in group_names:
            if Group.objects.filter(name=group_name).exists():
                existing_groups.append(group_name)
            else:
                non_existing_groups.append(group_name)
                # Create the group
                Group.objects.create(name=group_name)

        response_data = {
            'existing_groups': existing_groups,
            'non_existing_groups': non_existing_groups
        }

        if existing_groups:
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)


class BlogPermission(permissions.BasePermission):
    """
    Custom permission to allow access only to superusers or users in a specific group.
    """

    def has_permission(self, request, view):
        return request.user.is_superuser or request.user.groups.filter(name='Blogs').exists()

class Test(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, BlogPermission]
    def get(self, request):
        return Response("Working")
    

class GetUserByUsername(RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'username'
    
    
class PostList(ListAPIView):
    serializer_class = BlogSerializer
    pagination_class = BlogPaginations
    def get_queryset(self):
        posts = Post.objects.filter(allowed = True).order_by("-allowd_at")
        return posts


    
class AllowedPostsList(ListAPIView):
    serializer_class = BlogSerializer
    pagination_class = AdminPostPaginations
    queryset = Post.objects.all()
    def get_queryset(self):
        posts = Post.objects.filter(allowed = True).order_by("-allowd_at")
        return posts
class BlockedPostsList(ListAPIView):
    serializer_class = BlogSerializer
    pagination_class = AdminPostPaginations
    queryset = Post.objects.all()
    def get_queryset(self):
        posts = Post.objects.filter(allowed = False).order_by("-blocked_at")
        return posts
    
    
class BlogLength(APIView):
    def get(self, request):
        blogLen = len(Post.objects.filter(allowed=True))
        if blogLen > vars.max_no_of_posts:
            postLen = f"{vars.max_no_of_posts}+"
            return Response({"length": postLen})
        else:
            postLen = blogLen
            return Response({"length": postLen})


class BookList(ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class PostUser(RetrieveAPIView):
    serializer_class = BlogUserSerializer
    queryset = User.objects.all()
    lookup_field = "id"
    

class PostUserByUsername(ListAPIView):
    serializer_class = BlogUserSerializer
    def get_queryset(self):
        username = self.kwargs['username']
        user = User.objects.filter(username = username)
        return user
    

class GetGroupName(ListAPIView):
    serializer_class = GroupSerializer
    def get_queryset(self):
        id = int(self.kwargs['id'])
        group = Group.objects.filter(id=id)
        return group
    


class SinglePost(RetrieveAPIView):
    serializer_class = BlogSerializer
    queryset = Post.objects.all()
    lookup_field = "slug"
    
    
    
    
class CRUDPost(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, BlogPermission]
    parser_classes = [MultiPartParser, JSONParser]
    
    # def post(self, request, snoPost):
    #     if snoPost == 0:
    #         groups = request.user.groups.values_list('name', flat=True)
    #         if request.user.is_superuser or 'Blogs' in groups:
    #             data = request.data
    #             serializer = BlogSerializer(data=data)
    #             if serializer.is_valid():
                
    #                 author = CustomUser.objects.filter(TIDNO=data.get("TIDNO"))
    #                 print(author)
    #                 print(data.get(""))
    #                 if len(author) is 0:
    #                     author = None
    #                 if author is not None:
    #                     serializer.validated_data['author'] = author[0]
    #                     # serializer.save()
    #                     return Response({"success": True, "data": serializer.data}, status=status.HTTP_201_CREATED)
    #                 else:
    #                     return Response({"success": False, "err_code": "user_not_exists"}, status=status.HTTP_200_OK)            
    #             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #         return Response({"success": False}, status=status.HTTP_401_UNAUTHORIZED)
    #     return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, snoPost):
        data = request.data
        serializer = BlogSerializer(data=data)
        if serializer.is_valid():
            serializer.validated_data['allowed'] = True
            serializer.validated_data['allowd_at'] = datetime.now()
            serializer.save()
            return Response({"success": True, "data": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


    def delete(self, request, snoPost):
        post = Post.objects.filter(snoPost = snoPost).first()
        if not post == None:
            media_file_path = f'{settings.MEDIA_ROOT}/{post.image}'
            os.remove(media_file_path)
            # print(f'/media/{media_file_path}')
            post.delete()
            postSer = BlogSerializer(post)
            return Response({"success": True}, status=status.HTTP_200_OK)
        else:
            return Response('Post Not Found', status=status.HTTP_404_NOT_FOUND)
        
    def put(self, request, snoPost):
        json = request.data
        post = Post.objects.filter(snoPost = snoPost).first()
        if json['command'] == "allow":
            post.allowed = True
            post.allowd_at = timezone.datetime.now()
            post.save()
            return Response({"success": True}, status=status.HTTP_200_OK)
        if json['command'] == 'block':
            post.allowed = False
            post.blocked_at = timezone.datetime.now()
            post.save()
            return Response({"success": True}, status=status.HTTP_200_OK)
        


class GetUserData(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    



class UpdateProfile(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    parser_classes = ( MultiPartParser, JSONParser )
    
    def get(self, request):
        user = request.user
        serializer = UpdateProfileSerializer(user)
        return Response(serializer.data)
    
    def put(self, request):
        serializer = UpdateProfileSerializer(instance=request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class SearchBlog(APIView):
    def post(self, request):
        paginator = SearchPagination()
        data = request.data
        query = data.get('query')
        allPosts = []
        allPostTitle = Post.objects.filter(title__icontains = query, allowed = True)
        allPostAuthorFName = Post.objects.filter(author__first_name__icontains = query, allowed = True)
        allPostAuthorLName = Post.objects.filter(author__last_name__icontains = query, allowed = True)
        allPostContent = Post.objects.filter(content__icontains = query, allowed = True)
        allPosts = allPostTitle.union(allPostAuthorFName, allPostAuthorLName, allPostContent).order_by("-allowd_at")
        paginated_blogs = paginator.paginate_queryset(allPosts, request)

        
        # books = Book.objects.filter(bookName__icontains = query)
        # booksAuthor = Book.objects.filter(author__icontains = query)
        # booksCat = Book.objects.filter(category__icontains = query)
        # booksDesc = Book.objects.filter(desc__icontains = query)
        # allBooks = books.union(booksAuthor, booksCat, booksDesc)
        # BookSer = BookSerializer(allBooks, many=True)
        BloSer = BlogSerializer(paginated_blogs, many=True)
        return paginator.get_paginated_response(BloSer.data)
    
class SearchBook(APIView):
    def post(self, request):
        paginator = SearchPagination()
        data = request.data
        query = data.get('query')
        
        books = Book.objects.filter(bookName__icontains = query)
        booksAuthor = Book.objects.filter(author__icontains = query)
        booksCat = Book.objects.filter(category__icontains = query)
        booksDesc = Book.objects.filter(desc__icontains = query)
        allBooks = books.union(booksAuthor, booksCat, booksDesc)
        paginated_books = paginator.get_paginated_response(allBooks, request)
        BookSer = BookSerializer(paginated_books, many=True)
        return paginator.get_paginated_response(BookSer.data, status=status.HTTP_200_OK)
    