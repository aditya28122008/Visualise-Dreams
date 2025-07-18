from django.urls import path, re_path
from . import views
from django.views.generic import TemplateView
urlpatterns = [
    path('', views.blogIndex),
    path('blog/<str:slug>/', views.blogRead),
    path('category/<str:category>/', TemplateView.as_view(template_name='index.html')),
    path('b-cat/<str:category>/', TemplateView.as_view(template_name='index.html')),
    path('elibrary/', views.libIndex),
    path('profile/<str:username>/', views.profile),
    path('search/<str:query>/', TemplateView.as_view(template_name='index.html')),
    path('add-blog/', TemplateView.as_view(template_name='index.html')),
    path('book-read/<int:bookSno>/', views.bookRead),
    path('u-admin/', TemplateView.as_view(template_name='index.html')),
    path('stu/ed-bl/<str:slug>/', TemplateView.as_view(template_name='index.html')),
    path('admin/', TemplateView.as_view(template_name='index.html')),
    path('admin/a-posts/', TemplateView.as_view(template_name='index.html')),
    path('admin/ed-bl-cat/<str:name>/', TemplateView.as_view(template_name='index.html')),
    path('admin/add-bl-cat/', TemplateView.as_view(template_name='index.html')),
    path('admin/b-posts/', TemplateView.as_view(template_name='index.html')),
    path('admin/cat-blog/<str:cat>/', TemplateView.as_view(template_name='index.html')),
    path('admin/m-categories/', TemplateView.as_view(template_name='index.html')),
    path('admin/edit-blog/<str:slug>/', TemplateView.as_view(template_name='index.html')),
    path('admin/addblog/', TemplateView.as_view(template_name='index.html')),
    path('admin/eb/all-bk/', TemplateView.as_view(template_name='index.html')),
    path('admin/eb/add/', TemplateView.as_view(template_name='index.html')),
    path('admin/eb/edit/<int:bookSno>/', TemplateView.as_view(template_name='index.html')),
    path('admin/m-bk-cat/', TemplateView.as_view(template_name='index.html')),
    path('admin/cat-book/<str:cat>/', TemplateView.as_view(template_name='index.html')),
    path('admin/add-bk-cat/', TemplateView.as_view(template_name='index.html')),
    path('admin/ed-bk-cat/<str:name>/', TemplateView.as_view(template_name='index.html')),
    path('login/', TemplateView.as_view(template_name='index.html')),
    path('admin/all-users/', TemplateView.as_view(template_name='index.html')),
    path('admin/add-user/', TemplateView.as_view(template_name='index.html')),
    path('admin/user-blogs/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('admin/ed-user/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('*/', TemplateView.as_view(template_name='index.html')),
]

# urlpatterns += re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),