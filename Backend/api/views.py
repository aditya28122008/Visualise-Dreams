from .serializer import BlogSerializer, BlogUserSerializer, UserSerializer, BookSerializer, UpdateProfileSerializer, GroupSerializer
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from blog.models import Post
from accounts.models import CustomUser as User
from django.contrib.auth.models import Group
from Elibrary.models import Book

# Create your views here.

class PostList(ListAPIView):
    serializer_class = BlogSerializer
    pagination_class = PageNumberPagination
    def get_queryset(self):
        posts = Post.objects.filter(allowed = True)
        return posts
    
class PostListAdmin(ListAPIView):
    serializer_class = BlogSerializer
    pagination_class = PageNumberPagination
    queryset = Post.objects.all()
    


class BookList(ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class PostUser(ListAPIView):
    serializer_class = BlogUserSerializer
    def get_queryset(self):
        id = self.kwargs['id']
        user = User.objects.filter(id = id)
        return user
    

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
    
        

    
class SinglePost(APIView):
    serializer_class = BlogSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, slug):
        groups = request.user.groups.values_list('name', flat=True)
        if request.user.is_superuser or 'Blogs' in groups:
            slug = slug
            post = Post.objects.filter(slug = slug)
            ser = BlogSerializer(post)
            return Response(ser.data)
        else:
            slug = slug
            post = Post.objects.filter(slug = slug, allowed=True)
            ser = BlogSerializer(post)
            return Response(ser.data)
    

class CRUDPost(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, JSONParser]

    def post(self, request, snoPost):
        if snoPost == 0:
            serializer = BlogSerializer(data=request.data)
            if serializer.is_valid():
                serializer.validated_data['author'] = request.user
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)
        

    def delete(self, request, snoPost):
        groups = request.user.groups.values_list('name', flat=True)
        post = Post.objects.filter(snoPost = snoPost).first()
        if request.user.is_superuser or 'Blogs' in groups or post.author == request.user:
            if not post == None:
                post.delete()
                postSer = BlogSerializer(post)
                return Response(postSer.data)
            else:
                return Response('Post Not Found', status=status.HTTP_404_NOT_FOUND)
        else:
            return Response("Unauthorised", status=status.HTTP_401_UNAUTHORIZED)
        
    def put(self, request, snoPost):
        json = request.data
        groups = request.user.groups.values_list('name', flat=True)
        post = Post.objects.filter(snoPost = snoPost).first()
        if request.user.is_superuser or 'Blogs' in groups:
            # print(json)
            if json['command'] == "allow":
                post.allowed = True
                post.save()
                postSer = BlogSerializer(post)
                return Response(postSer.data)
            if json['command'] == 'block':
                post.allowed = False
                post.save()
                postSer = BlogSerializer(post)
                return Response(postSer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        


class GetUserData(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    

class TestUpdate(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    parser_classes = ( MultiPartParser, FormParser, JSONParser )
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
        paginator = PageNumberPagination()
        data = request.data
        query = data.get('query')
        allBooks = []
        allPosts = []
        allPostTitle = Post.objects.filter(title__icontains = query, allowed = True)
        allPostAuthorFName = Post.objects.filter(author__first_name__icontains = query, allowed = True)
        allPostAuthorLName = Post.objects.filter(author__last_name__icontains = query, allowed = True)
        allPostContent = Post.objects.filter(content__icontains = query, allowed = True)
        allPosts = allPostTitle.union(allPostAuthorFName, allPostAuthorLName, allPostContent)




        books = Book.objects.filter(bookName__icontains = query)
        booksAuthor = Book.objects.filter(author__icontains = query)
        booksCat = Book.objects.filter(category__icontains = query)
        booksDesc = Book.objects.filter(desc__icontains = query)
        allBooks = books.union(booksAuthor, booksCat, booksDesc)
        BookSer = BookSerializer(allBooks, many=True)
        BloSer = BlogSerializer(allPosts, many=True)
        return Response([{"posts": BloSer.data, "books": BookSer.data}])
    