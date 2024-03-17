from django.urls import path
from . import views

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('post/', views.PostList.as_view()),
    path('a-post-admin/', views.AllowedPostsList.as_view()),
    path('post/<str:slug>/', views.SinglePost.as_view()),
    path('all-books/', views.BookList.as_view()),
    path('post-user/<int:id>/', views.PostUser.as_view()),
    path('post-user-username/<str:username>/', views.PostUserByUsername.as_view()),
    path('ed-prof/', views.UpdateProfile.as_view()),
    path('token/', TokenObtainPairView.as_view()),
    path('token-refresh/', TokenRefreshView.as_view()),
    path('user-data/', views.GetUserData.as_view(), name="userData"),
    path('search/', views.SearchBlog.as_view()),
    path('admin-crud-blogs/<int:snoPost>', views.CRUDPost.as_view()),
    path('group-name/<str:id>/', views.GetGroupName.as_view())
]