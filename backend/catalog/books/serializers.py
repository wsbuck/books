from rest_framework import serializers

from .models import Book, Author, Review, Genre, Language, ReadBook

from users.serializers import UserSerializer


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
    """
    This serializer is used for BookDetail.
    Need more information on Foreign Keys than just pk
    """
    language = LanguageSerializer()
    genre = GenreSerializer()
    author = AuthorSerializer()

    class Meta:
        model = Book
        fields = [
            'pk', 'title', 'description', 'language',
            'genre', 'author', 'isbn', 'cover_image', 'publication_date',
        ]

class BookCreateSerializer(serializers.ModelSerializer):
    """
    Serializer used strictly for creation
    
    This could probably be optimized instead of having two serializers.
    """
    class Meta:
        model = Book
        fields = [
            'pk', 'title', 'description', 'language',
            'genre', 'author', 'isbn', 'cover_image', 'publication_date'
        ]


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Review
        fields = [
            'user', 'content', 'date_published', 'star_rating',
            'book', 'pk',
        ]

class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            'user', 'content', 'star_rating', 'book', 'pk'
        ]

class ReadBookSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = ReadBook
        fields = [
            'user', 'book', 'timestamp'
        ]