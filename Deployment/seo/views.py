from django.shortcuts import render
from django.contrib.sites.shortcuts import get_current_site
from blog.models import Post
from accounts.models import CustomUser
from Elibrary.models import Book
# Create your views here.


def profile(request, username):
    user = {}
    try:
        user = CustomUser.objects.get(username=username)
    except Book.DoesNotExist:
        user = {
            "first_name": "404 NOT FOUND",
            "bio": "",
            "username": "",
            "bannerImg": "/static/not-found.png"
        }
        
    return render(request, 'seo/profile.html', {"user": user, "host": f"https://{get_current_site(request)}"})







def blogRead(request, slug):
    post = {}
    try:
        post = Post.objects.get(slug=slug)
    except Post.DoesNotExist:
        post = {
            "title": "404 NOT FOUND",
            "tagline": "",
            "image": "/static/not-found.png"
        }
    return render(request, 'seo/blog/blog.html', {"post": post, "host": f"https://{get_current_site(request)}"})


def blogIndex(request,  **kwargs):
    return render(request, 'seo/index.html')













def libIndex(request):
    return render(request, 'seo/lib/library.html')

def bookRead(request, bookSno):
    book = {}
    try:
        book = Book.objects.get(bookSno=bookSno)
    except Book.DoesNotExist:
        book = {
            "bookName": "404 NOT FOUND",
            "author": "",
            "bookCover": "/static/not-found.png"
        }
    return render(request, "seo/lib/book.html", {"book": book, "host": f"https://{get_current_site(request)}"})