import json

from django.urls import reverse

from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from users.models import User

from .models import Book, Author, Genre, Language, Review
from .serializers import (
    BookSerializer, AuthorSerializer, ReviewSerializer
)

class AuthorListCreateAPIViewTestCase(APITestCase):
    url = reverse('author-list')

    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@example.com',
            first_name='test',
            last_name='user',
            password = '53cr3t_pa55w0rd'
        )
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.token.key
        )
    

    def test_create_author(self):
        response = self.client.post(
            self.url,
            {
                'first_name': 'J.R.',
                'last_name': 'Tolkien'
            }
        )
        self.assertEqual(201, response.status_code)
    
    def test_authors_list(self):
        """
        Test to verify  author list
        """
        Author.objects.create(first_name='Phillip', last_name='Dick')
        response = self.client.get(self.url)
        response_authors_count = json.loads(response.content)['count']
        author_count = Author.objects.all().count()
        self.assertTrue(
            response_authors_count == author_count
        )
    


class BookListAPIViewTestCase(APITestCase):
    url = reverse('book-create')

    def setUp(self):
        self.email = "testuser@gmail.com"
        self.password = "53cr3t_pa55w0rd"
        self.first_name = "Test"
        self.last_name = "User"
        self.user = User.objects.create_user(
            email=self.email,
            first_name=self.first_name,
            last_name=self.last_name,
            password=self.password
        )
        self.token = Token.objects.create(user=self.user)
        Author.objects.create(first_name='Test', last_name='Author')
        Genre.objects.create(name='Fantasy')
        self.api_authentication()
    
    def api_authentication(self):
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + self.token.key
        )
    
    def test_create_book(self):
        author = Author.objects.get(first_name='Test', last_name='Author')
        genre = Genre.objects.get(name='Fantasy')
        response = self.client.post(self.url, {
            'title': 'A test book title',
            'description': 'A very nice description',
            'author': author.pk,
            'genre': genre.pk
        })
        
        self.assertEqual(201, response.status_code)