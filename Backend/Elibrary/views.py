# from django.shortcuts import render, redirect
# from .models import Book
# from blog.models import Post
# import visualise_dreams.vars as vars
# from .forms import UploadFileForm



# def index(request):
#     blogLen = len(Post.objects.all())
#     books = Book.objects.all()
#     if blogLen > vars.max_no_of_posts:
#         postLen = f"{vars.max_no_of_posts}+"
#     else:
#         postLen = blogLen
#     context = {
#             "postLen": postLen,
#             "books": books,
#         }
#     return render(request, 'elibrary/libraryIndex.html', context)