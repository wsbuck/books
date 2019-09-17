from django.urls import path

from users import views

urlpatterns = [
    # path('', views.UserList.as_view(), name='user-list'),
    path('create/', views.UserCreate.as_view(), name='user-create'),
]