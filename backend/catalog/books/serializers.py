from rest_framework import serializers

from .models import Book, Author, Review

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = [
            'title', 'description', 'language', 'category',
            'genre', 'author', 'isbn', 'cover_image', 'language',
        ]

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = [
            'first_name', 'last_name', 'date_of_birth',
            'date_of_death', 'headshot',
        ]

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            'user', 'content', 'date_published', 'star_rating',
            'book',
        ]
