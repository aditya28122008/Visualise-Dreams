from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from . import views
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static
from django.views.generic import TemplateView
admin.site.site_header = "MPS Ajmer.com's Admin"
admin.site.site_title = "MPS Ajmer.com Admin Portal"
admin.site.index_title = "Welcome to MPS Ajmer's Administration"
urlpatterns = [
    path('reset_password/', auth_views.PasswordResetView.as_view(), name='reset_password'),
    path('reset_password_sent/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset_password_complete/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('theBoss/', admin.site.urls),
    # re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
    # path('', views.index, name="home"),
    # path('blog/', include('blog.urls'), name="blog"),
    # path('library/', include('Elibrary.urls'), name="eLibrary"),
    path('api/', include('api.urls'), name="api"),
    path('test-api/', include('fileUploadTest.urls'), name="api"),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),