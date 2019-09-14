from django.contrib import admin

from .models import Book, Author, Review, Genre, Language

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['__str__']

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ['__str__']

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['__str__']

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ['__str__']

@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ['__str__']