from rest_framework import serializers

from .models import Book, Author, Review, Genre, Language


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['pk', 'name']


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['pk', 'name', 'category']


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = [
            'first_name', 'last_name', 'date_of_birth',
            'date_of_death', 'headshot', 'pk',
        ]


class AuthorSerializerSimple(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['pk', 'first_name', 'last_name']


class BookSerializer(serializers.ModelSerializer):
    # language = LanguageSerializer()
    genre = GenreSerializer()
    author = AuthorSerializer()

    class Meta:
        model = Book
        fields = [
            'pk', 'title', 'description', 'language',
            'genre', 'author', 'isbn', 'cover_image',
        ]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            'user', 'content', 'date_published', 'star_rating',
            'book',
        ]