from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.reverse import reverse

from .models import Book, Author, Review, Genre, Language
from .serializers import (
    BookSerializer, AuthorSerializer, ReviewSerializer,
    GenreSerializer, LanguageSerializer, AuthorSerializerSimple,
    BookCreateSerializer
)

@api_view(['GET', 'POST'])
def create_book(request):
    if request.method == 'GET':
        genres = GenreSerializer(Genre.objects.all(), many=True)
        languages = LanguageSerializer(Language.objects.all(), many=True)
        authors = AuthorSerializerSimple(Author.objects.all(), many=True)
        return Response({
            'genres': genres.data,
            'languages': languages.data,
            'authors': authors.data,
        })
    elif request.method == 'POST':
        serializer = BookCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data, status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )


class BookList(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class AuthorList(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class AuthorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class ReviewCreate(generics.CreateAPIView):
    serializer_class = ReviewSerializer

class GenreList(generics.ListCreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class GenreDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class LanguageList(generics.ListCreateAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

class LanguageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer