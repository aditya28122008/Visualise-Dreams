from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='homeindex'),
    path('login/', views.handleLogin, name='login'),
    path('logout/', views.handleLogout, name='logout'),
    path('search/', views.search, name='search'),
    path('profile/<str:usern>', views.profile, name='profileIndex'),
    path('editprofile/', views.editProfile, name='editProfileIndex'),
]

