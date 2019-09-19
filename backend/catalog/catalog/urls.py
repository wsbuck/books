from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.authtoken import views

urlpatterns = [
    # v1 api
    path('api/v1/users/', include('users.urls')),
    path('api/v1/', include('books.urls')),
    path('api/v1/api-token-auth/', views.obtain_auth_token),
    # admin
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)