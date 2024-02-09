from django.shortcuts import render
from blog.models import Post
import visualise_dreams.vars as vars

# Create your views here.



def index(request):
    allPosts = Post.objects.all()
    blogLen = len(Post.objects.all())
    if blogLen > vars.max_no_of_posts:
        postLen = f"{vars.max_no_of_posts}+"
    else:
        postLen = blogLen
    context = {
        "allPosts": allPosts,
        "postLen": postLen,
    }
    return render(request, 'blog/blog.html', context)


def post(request, slug):
    post = Post.objects.filter(slug = slug).get()
    blogLen = len(Post.objects.all())
    if blogLen > vars.max_no_of_posts:
        postLen = f"{vars.max_no_of_posts}+"
    else:
        postLen = blogLen
    context = {
        "post": post,
        "postLen": postLen,
    }
    return render(request, 'blog/post.html', context)