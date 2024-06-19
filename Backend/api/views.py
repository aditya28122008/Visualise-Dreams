from .serializer import BlogSerializer, BlogUserSerializer, UserSerializer, BookSerializer, UpdateProfileSerializer, GroupSerializer, CategorySerializer, BookCategorySerializer
from datetime import datetime
from accounts.models import CustomUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, permissions
import os
from visualise_dreams import settings
from blog.models import Post, Categories
from accounts.models import CustomUser as User
from django.contrib.auth.models import Group
from Elibrary.models import Book, BookCategory
from visualise_dreams import vars
from django.utils import timezone
from django.db.models import Prefetch
from .pagination import BlogPaginations, AdminPostPaginations, SearchPagination, PageNumberPagination, AdminBookPaginations
from .permissions import IsSuperUserPermission, BlogPermission, ElibraryPermission


        

"""
Blogs And Elibrary Starts from Here
"""

class AdminCRUDBooks(APIView):
    parser_classes = [MultiPartParser]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, ElibraryPermission]
    def post(self, request, bookSno):
        if bookSno == 0:
            data = request.data
            bookSer = BookSerializer(data=data)
            if bookSer.is_valid():
                bookSer.save()
                return Response({"success": True, "data": bookSer.data}, status=status.HTTP_201_CREATED)
            else:
                return Response({"success": False, "err": bookSer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"success": False}, status=status.HTTP_400_BAD_REQUEST)
        

    def delete(self, request, bookSno):
        book = Book.objects.get(bookSno=bookSno)
        if not book == None:
            media_file_path_cov = f'{settings.MEDIA_ROOT}/{book.bookCover}'
            media_file_path_pdf = f'{settings.MEDIA_ROOT}/{book.bookPDF}'
            os.remove(media_file_path_cov)
            os.remove(media_file_path_pdf)
            book.delete()
            return Response({"success": True}, status=status.HTTP_200_OK)
        else:
            return Response('Post Not Found', status=status.HTTP_404_NOT_FOUND)
        
    def put(self, request, bookSno):
        try:
            currBook = Book.objects.get(bookSno=bookSno)
            bookSer = BookSerializer(currBook, data=request.data, partial=True)
            if bookSer.is_valid():
                bookSer.save()
                return Response({"success": True, "data": bookSer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"success": False, "err": bookSer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Book.DoesNotExist:
            return Response({"success": False, "err": "Book not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"success": False, "err": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def get(self, request, bookSno):
        book = Book.objects.get(bookSno = bookSno)
        serBook = BookSerializer(book)
        return Response({"payload": serBook.data, "success": True})

class GetSpBlCat(RetrieveAPIView):
    serializer_class = CategorySerializer
    queryset = Categories.objects.all()
    lookup_field = "name"


class GetSpBkCat(RetrieveAPIView):
    serializer_class = BookCategorySerializer
    queryset = BookCategory.objects.all()
    lookup_field = "name"



class DeleteBlCat(APIView):
    authentication_classes = [JWTAuthentication]
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated, BlogPermission]
    def get(self, request, name):
        cat = Categories.objects.get(name = name)
        posts = Post.objects.filter(category = cat)
        if len(posts) == 0:
            cat.delete()
            return Response({"success": True}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, "code": "p_exists"})


class AdminCatBookList(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, BlogPermission]
    serializer_class = BookSerializer
    pagination_class = AdminPostPaginations
    def get_queryset(self):
        cat = self.kwargs['cat']
        category = BookCategory.objects.get(name = cat)
        posts = Book.objects.filter(category=category)
        return posts



class AdminCRUDBKCat(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, ElibraryPermission]
    parser_classes = [MultiPartParser, JSONParser]


    def get(sef, request, sno):
        cats = BookCategory.objects.all()
        serCats = BookCategorySerializer(cats, many=True)
        return Response(serCats.data)
    
    
    def post(self, request, sno):
        if sno == 0:
            data = request.data
            cat = None
            try:
                cat = BookCategory.objects.get(name=data['name'])
            except Exception as e:
                pass
            if not cat:
                ser = BookCategorySerializer(data=data)
                if ser.is_valid():
                    ser.save()
                    return Response({"success": True}, status=status.HTTP_201_CREATED)
                return Response({"success": True}, status=status.HTTP_201_CREATED)
            else:
                return Response({"success": False}, status=status.HTTP_409_CONFLICT)
        else:
            return Response({"success": False}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, sno):
        cat = BookCategory.objects.get(sno = sno)
        posts = Book.objects.filter(category = cat)
        if len(posts) == 0:
            cat.delete()
            return Response({"success": True}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, "code": "p_exists"})
        

class UpdateBkCat(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, ElibraryPermission]
    parser_classes = [MultiPartParser]
    def put(self, request, name):
        data = request.data
        cat = BookCategory.objects.filter(name=name)
        if cat.exists():
            newcat = cat.first()
            new_name = data.get('name')
            if BookCategory.objects.filter(name=new_name).exclude(sno=newcat.sno).exists():
                return Response({"success": False, "message": "Category name already in use"}, status=status.HTTP_409_CONFLICT)
            ser = BookCategorySerializer(instance=newcat, data=data)
            if ser.is_valid():
                ser.save()
                return Response({"success": True}, status=status.HTTP_200_OK)
            else:
                return Response({"success": False}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"success": False, "message": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
    


class AddBlCategory(APIView):
    parser_classes = [MultiPartParser]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, BlogPermission]
    def post(self, request):
        data = request.data
        cat = None
        try:
            cat = Categories.objects.get(name=data['name'])
        except Exception as e:
            pass
        if not cat:
            ser = CategorySerializer(data=data)
            if ser.is_valid():
                ser.save()
                return Response({"success": True}, status=status.HTTP_201_CREATED)
            return Response({"success": True}, status=status.HTTP_201_CREATED)
        else:
            return Response({"success": False}, status=status.HTTP_409_CONFLICT)

class UpdateBlCat(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, BlogPermission]
    parser_classes = [MultiPartParser]
    def put(self, request, name):
        data = request.data
        cat = Categories.objects.filter(name=name)
        if cat.exists():
            newcat = cat.first()
            new_name = data.get('name')
            if Categories.objects.filter(name=new_name).exclude(sno=newcat.sno).exists():
                return Response({"success": False, "message": "Category name already in use"}, status=status.HTTP_409_CONFLICT)

            ser = CategorySerializer(instance=newcat, data=data)
            
            if ser.is_valid():
                ser.save()
                return Response({"success": True}, status=status.HTTP_200_OK)
            else:
                return Response({"success": False}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"success": False, "message": "Category not found"}, status=status.HTTP_404_NOT_FOUND)



class CatBookList(APIView):
    def get(self, request):
        cats = BookCategory.objects.prefetch_related(
            Prefetch('book_set', queryset=Book.objects.all().order_by("-bookSno"), to_attr='books')
        )
        allBooks = []
        for cat in cats:
            if cat.books:  # Ensure there are posts before processing
                catPosts = BookSerializer(cat.books, many=True).data
                categortSer = BookCategorySerializer(cat)
                catObj = {
                    "cat": categortSer.data['name'],
                    "books": catPosts,
                }
                allBooks.append(catObj)
        paginator = PageNumberPagination()
        paginator.page_size = 3
        page = paginator.paginate_queryset(allBooks, request)
        if page is not None:
            return paginator.get_paginated_response(page)
        return Response(allBooks)

class CatPostList(APIView):
    def get(self, request):
        cats = Categories.objects.all()
        allPosts = []
        for cat in cats:
            posts = Post.objects.filter(category = cat, allowed = True).order_by("-allowd_at")
            catPosts = []
            for post in posts:
                serPos = BlogSerializer(post)
                catPosts.append(serPos.data)
            categortSer = CategorySerializer(cat)
            catObj = {
                "cat": categortSer.data['name'],
                "posts": catPosts,
            }
            if len(posts) > 0:
                allPosts.append(catObj)
        return Response(allPosts)

class GetUserByUsername(RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'username'
    
    
class PostList(ListAPIView):
    serializer_class = BlogSerializer
    pagination_class = BlogPaginations
    def get_queryset(self):
        cat = self.kwargs['cat']
        category = Categories.objects.get(name =cat)
        posts = Post.objects.filter(allowed = True, category=category).order_by("-allowd_at")
        return posts
    

class AdminPostList(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, BlogPermission]
    serializer_class = BlogSerializer
    pagination_class = AdminPostPaginations
    def get_queryset(self):
        cat = self.kwargs['cat']
        category = Categories.objects.get(name = cat)
        posts = Post.objects.filter(category=category).order_by("-timeStamp")
        return posts


    
class AllowedPostsList(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, BlogPermission]
    serializer_class = BlogSerializer
    pagination_class = AdminPostPaginations
    queryset = Post.objects.all()
    def get_queryset(self):
        posts = Post.objects.filter(allowed = True).order_by("-allowd_at")
        return posts

class BlockedPostsList(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, BlogPermission]
    serializer_class = BlogSerializer
    pagination_class = AdminPostPaginations
    queryset = Post.objects.all()
    def get_queryset(self):
        posts = Post.objects.filter(allowed = False).order_by("-blocked_at")
        return posts
    
    
class GetCategoryList(ListAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer
    
class GetBlCategoryList(ListAPIView):
    queryset = BookCategory.objects.all()
    serializer_class = BookCategorySerializer
    
    
class BlogLength(APIView):
    def get(self, request):
        blogLen = Post.objects.filter(allowed=True).count()
        if blogLen > vars.max_no_of_posts:
            postLen = f"{vars.max_no_of_posts}+"
            return Response({"length": postLen})
        else:
            return Response({"length": blogLen})


class BookList(ListAPIView):
    pagination_class = PageNumberPagination
    pagination_class.page_size = 4
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    def get_queryset(self):
        categorySno = self.kwargs['cat']
        mainCat = BookCategory.objects.get(name=categorySno)
        books = Book.objects.filter(category=mainCat)
        return books
    
class BookListAdmin(ListAPIView):
    pagination_class = AdminBookPaginations
    pagination_class.page_size = 10
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
    

class GetGroupName(RetrieveAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    lookup_field = 'id'
    


class SinglePost(RetrieveAPIView):
    serializer_class = BlogSerializer
    queryset = Post.objects.all()
    lookup_field = "slug"
    
    
    
    
class CRUDPost(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, BlogPermission]
    parser_classes = [MultiPartParser, JSONParser]
        
    def post(self, request, snoPost):
        data = request.data
        if snoPost == 0:
            serializer = BlogSerializer(data=data)
            if serializer.is_valid():
                serializer.validated_data['allowed'] = True
                serializer.validated_data['allowd_at'] = datetime.now()
                serializer.save()
                return Response({"success": True, "data": serializer.data}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, snoPost):
        post = Post.objects.get(snoPost = snoPost)
        if not post == None:
            media_file_path = f'{settings.MEDIA_ROOT}/{post.image}'
            os.remove(media_file_path)
            post.delete()
            return Response({"success": True}, status=status.HTTP_200_OK)
        else:
            return Response('Post Not Found', status=status.HTTP_404_NOT_FOUND)
        
    def patch(self, request, snoPost):
        post = Post.objects.get(snoPost = snoPost)
        if post.allowed == False:
            data = request.data
            serializer = BlogSerializer(data=data)
            serializer.instance = post
            
            if serializer.is_valid():
                try:
                    if serializer.validated_data['image']:
                        media_file_path = f'{settings.MEDIA_ROOT}/{post.image}'
                        os.remove(media_file_path)
                except Exception as error:
                    pass
                if post.by_admin != True:
                    serializer.validated_data['author'] = post.author
                else:
                    serializer.validated_data['by_admin'] = True
                serializer.save()
                return Response({"success": True})
            else:
                return Response({}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({}, status=status.HTTP_401_UNAUTHORIZED)
        
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
        

class StudentsBlogApi(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser]
    
    def post(self, request, snoPost):
        data = request.data
        ser = BlogSerializer(data=data)
        if snoPost == 0:
            if ser.is_valid():
                ser.validated_data['author'] = request.user
                ser.validated_data['by_admin'] = False
                ser.validated_data['allowed'] = False
                ser.validated_data['blocked_at'] = datetime.now()
                ser.save()
                return Response({"success": True, "data": ser.data})            
            else:
                return Response({}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        




class GetUserData(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    

class GetUserSpBlogs(ListAPIView):
    serializer_class = BlogSerializer
    queryset = Post.objects.all()
    pagination_class = PageNumberPagination
    pagination_class.page_size = 10
    def get_queryset(self):
        username = self.kwargs['username']
        user = CustomUser.objects.get(username = username)
        posts = Post.objects.filter(author = user, allowed=True)
        return posts



class UpdateProfile(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    parser_classes = (MultiPartParser, JSONParser)

    def get(self, request):
        user = request.user
        serializer = UpdateProfileSerializer(user)
        return Response(serializer.data)
    
    def put(self, request):
        serializer = UpdateProfileSerializer(instance=request.user, data=request.data)
        if serializer.is_valid():
            try:
                if serializer.validated_data['profile']:
                    if request.user.profile != 'user/blank.webp':
                        media_file_path = f'{settings.MEDIA_ROOT}/{request.user.profile}'
                        os.remove(media_file_path)
            except Exception as error:
                pass
            try:
                if serializer.validated_data['bannerImg']:
                    if request.user.bannerImg != 'user/blank.webp':
                        media_file_path = f'{settings.MEDIA_ROOT}/{request.user.bannerImg}'
                        os.remove(media_file_path)
            except Exception as error:
                pass
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class SearchBlog(APIView):
    parser_classes = [JSONParser]
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
        BloSer = BlogSerializer(paginated_blogs, many=True)
        return paginator.get_paginated_response(BloSer.data)
    
class SearchBook(APIView):
    parser_classes = [JSONParser]
    def post(self, request):
        paginator = SearchPagination()
        data = request.data
        query = data.get('query')
        books = Book.objects.filter(bookName__icontains = query)
        booksAuthor = Book.objects.filter(author__icontains = query)
        booksCat = Book.objects.filter(category__name__icontains = str(query))
        allBooks = books.union(booksAuthor, booksCat)
        paginated_books = paginator.paginate_queryset(allBooks, request)
        BookSer = BookSerializer(paginated_books, many=True)
        return paginator.get_paginated_response(BookSer.data)
    

"""
Blogs And Elibrary ends Here
"""