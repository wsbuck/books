from django.urls import path

from . import views

urlpatterns = [
    path(
        'add/book/',
        views.create_book,
        name='book-create'
    ),
    path(
        'books/',
        views.BookList.as_view(),
        name='book-list'
    ),
    path(
        'books/<int:pk>/',
        views.BookDetail.as_view(),
        name='book-detail'
    ),
    path(
        'authors/',
        views.AuthorList.as_view(),
        name='author-list'
    ),
    path(
        'authors/<int:pk>/',
        views.AuthorDetail.as_view(),
        name='author-detail'
    ),
    path(
        'genres/',
        views.GenreList.as_view(),
        name='genre-list'
    ),
    path(
        'languages/',
        views.LanguageList.as_view(),
        name='language-list'
    ),
    path(
        'books/<int:pk>/reviews/',
        views.ReviewList.as_view(),
        name='review-list'
    ),
]
