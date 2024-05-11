from django.urls import path
from . import views

from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('post/', views.PostList.as_view()),
    path('get-post-length/', views.BlogLength.as_view()),
    path('get-user-by-username/<str:username>/', views.GetUserByUsername.as_view()),
    path('a-post-admin/', views.AllowedPostsList.as_view()),
    path('b-post-admin/', views.BlockedPostsList.as_view()),
    path('post/<str:slug>/', views.SinglePost.as_view()),
    path('test/', views.Test.as_view()),
    path('all-books/', views.BookList.as_view()),
    path('post-user/<int:id>/', views.PostUser.as_view()),
    path('post-user-username/<str:username>/', views.PostUserByUsername.as_view()),
    path('ed-prof/', views.UpdateProfile.as_view()),
    path('token/', TokenObtainPairView.as_view()),
    path('user-data/', views.GetUserData.as_view(), name="userData"),
    path('search-blogs/', views.SearchBlog.as_view()),
    path('admin-crud-blogs/<int:snoPost>', views.CRUDPost.as_view()),
    path('group-name/<str:id>/', views.GetGroupName.as_view()),
    path('check-group-exists/', views.CheckGroupExists.as_view()),
    # path('password/reset/', views.PasswordResetRequestView.as_view(), name='password_reset_request'),
    # path('password/reset/confirm/<str:uidb64>/<str:token>/', views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('password-reset/', views.PasswordResetView.as_view(), name='password_reset'),
]