from django.http import Http404

from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.reverse import reverse
from rest_framework.permissions import (
    IsAuthenticated, SAFE_METHODS, BasePermission
)

from .models import Book, Author, Review, Genre, Language, ReadBook
from .serializers import (
    BookSerializer, AuthorSerializer, ReviewSerializer,
    GenreSerializer, LanguageSerializer, AuthorSerializerSimple,
    BookCreateSerializer, ReviewCreateSerializer,
)

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


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


class ReviewList(APIView):
    permission_classes = [IsAuthenticated|ReadOnly]

    def get(self, request, pk):
        reviews = Review.objects.filter(book__pk=pk)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    
    def post(self, request, pk):
        data = {}
        data['book'] = pk
        data['user'] = request.user.pk
        data['content'] = request.data['content']
        data['star_rating'] = request.data['star_rating']
        serializer = ReviewCreateSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            resp_serializer = ReviewSerializer(Review.objects.get(
                pk=serializer.data['pk']
            ))
            return Response(
                resp_serializer.data, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class ReadBookList(APIView):

    def get(self, request, pk):
        read_books = ReadBook.objects.filter(user__pk=pk)
        serializer = ReadBookSerializer(read_books, many=True)
        return Response(serializer.data)
    


class BookList(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class AuthorList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class AuthorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class ReviewCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ReviewSerializer


class GenreList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class GenreDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class LanguageList(generics.ListAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer


class LanguageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
