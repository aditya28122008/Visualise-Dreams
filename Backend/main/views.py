from django.shortcuts import render, HttpResponse, redirect
from blog.models import Post
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import EditProfileStudent, TBannerIm, ChProIm
import visualise_dreams.vars as vars
from Elibrary.models import Book
from accounts.models import CustomUser as userModel
from django.contrib.auth.models import Permission
# Create your views here.

def index(request):
    allPosts = Post.objects.all().order_by("-snoPost")[:3]
    blogLen = len(Post.objects.all())
    
    if blogLen > vars.max_no_of_posts:
        postLen = f"{vars.max_no_of_posts}+"
    else:
        postLen = blogLen
    context = {
        "allPosts": allPosts,
        "postLen": postLen,
    }
    # messages.success(request, "Welcome")
    # messages.warning(request, "Welcome")
    # messages.info(request, "Welcome")
    return render(request, 'home/index.html', context)



def handleLogin(request):
    if request.user.is_authenticated:
        return redirect("homeindex")
    else:
        blogLen = len(Post.objects.all())
        if blogLen > vars.max_no_of_posts:
            postLen = f"{vars.max_no_of_posts}+"
        else:
            postLen = blogLen
        context = {
            "postLen": postLen,
        }
        if request.method == "POST":
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(username = username, password = password)
            if user is not None:
                login(request, user)
                messages.success(request, 'Successfully Logged In !')
                return redirect('homeindex')
            else:
                messages.warning(request, "That Username Or Password isn't matching. Please! Check Your Credentials")
                redirect('login')
        return render(request, 'home/login.html', context)
        


@login_required
def handleLogout(request):
    logout(request)
    messages.success(request, "Successfully Logged Out !")
    return redirect("homeindex")


def search(request):
    blogLen = len(Post.objects.all())
    if blogLen > vars.max_no_of_posts:
        postLen = f"{vars.max_no_of_posts}+"
    else:
        postLen = blogLen
    query = request.GET['query']
    if len(query) > 78:
        allPosts = []
    else:
        allPostTitle = Post.objects.filter(title__icontains = query)
        allPostAuthorFName = Post.objects.filter(author__first_name__icontains = query)
        allPostAuthorLName = Post.objects.filter(author__last_name__icontains = query)
        allPostTag = Post.objects.filter(tagline__icontains = query)
        allPostContent = Post.objects.filter(content__icontains = query)
        allPostDesc = Post.objects.filter(desc__icontains = query)
        allPosts = allPostTitle.union(allPostAuthorFName, allPostTag, allPostContent, allPostDesc, allPostAuthorLName)
        booksAuthor = Book.objects.filter(author__icontains = query)
        booksName = Book.objects.filter(bookName__icontains = query)
        booksDesc = Book.objects.filter(desc__icontains = query)
        books = booksAuthor.union(booksName, booksDesc)


    if len(allPosts) == 0 and len(books) == 0:
        messages.warning(request, 'No Search Results Found')

    context = {
        'allPosts': allPosts,
        'query': query,
        "postLen": postLen,
        "books": books
    }
    return render(request, 'home/search.html', context)



def profile(request, usern):
    if request.method == "POST":
        # chProIm = ChProIm(request.POST, request.FILES, instance=request.user.profile)
        tBannerIm = TBannerIm(request.FILES, instance=request.user)

        # if chProIm.is_valid():
        #     chProIm.save()
        #     messages.success(request, "Profile Updated Successfully")
        #     return redirect("/profile/" + request.user.username)
        
        if tBannerIm.is_valid():
            tBannerIm.save()
            messages.success(request, "Profile Updated Successfully")
            return redirect("/profile/" + request.user.username)
        
    else:
        # chProIm = ChProIm(instance=request.user.profile)
        tBannerIm = TBannerIm()
        blogLen = len(Post.objects.all())
        if blogLen > vars.max_no_of_posts:
            postLen = f"{vars.max_no_of_posts}+"
        else:
            postLen = blogLen
        profUser = userModel.objects.get(username = usern)

        context = {
            "profUser": profUser,
            "postLen": postLen,
            "tBannerIm": tBannerIm,
            # "chProIm": chProIm
        }
        return render(request, 'home/profile.html', context)


@login_required
def editProfile(request):
    blogLen = len(Post.objects.all())
    print(request.user.user_permissions.all())
    if blogLen > vars.max_no_of_posts:
        postLen = f"{vars.max_no_of_posts}+"
    else:
        postLen = blogLen
    if request.method == "POST":
        form = EditProfileStudent(request.POST, instance=request.user)
        if form.is_valid:
            form.save()
            messages.success(request, "Profile Updated Successfully")
            return redirect("/profile/" + request.user.username)
        
        
        
    else:
        form = EditProfileStudent(instance=request.user)
    context = {
        "postLen": postLen,
        "form": form
    }
    return render(request, 'home/editProfile.html', context)