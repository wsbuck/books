from django.db import models
from django.contrib.contenttypes.fields import (
    GenericForeignKey, GenericRelation
)
from django.contrib.contenttypes.models import ContentType

from users.models import User

from .choices import CATEGORY_CHOICES, GENRE_CHOICES, STAR_CHOICES


class Author(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField(null=True, blank=True)
    date_of_death = models.DateField(null=True, blank=True)
    headshot = models.ImageField(upload_to='author_headshot', blank=True,
                                 null=True)

    class Meta:
        ordering = ['last_name', 'first_name']

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)


class Genre(models.Model):
    """
    Model representing a book genre
    """
    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(choices=CATEGORY_CHOICES,
                                default='fiction',
                                max_length=100, unique=False)

    def __str__(self):
        return self.name


class Language(models.Model):
    """
    Model representing the written language
    """
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    """
    Model representing a book
    """
    title = models.CharField(max_length=100)
    description = models.TextField()
    genre = models.ForeignKey(Genre, related_name='books',
                              on_delete=models.CASCADE)
    author = models.ForeignKey(Author, related_name='books',
                               on_delete=models.CASCADE)
    isbn = models.CharField('ISBN', max_length=13, null=True, blank=True)
    cover_image = models.ImageField(upload_to='book_covers',
                                    blank=False, null=True,
                                    default='book_covers/bookDefault.png')
    language = models.ForeignKey(
        Language, on_delete=models.SET_NULL, null=True)
    publication_date = models.DateField(null=True, blank=True)
    # reads field used to keep track if a user read this book
    reads = GenericRelation('ReadBook')
    
    class Meta:
        ordering = ['-publication_date']

    def __str__(self):
        return "{} ({}) by {}".format(
            self.title, self.isbn, self.author.last_name)


class Review(models.Model):
    """
    Model representing a book review by a user
    """
    user = models.ForeignKey(User, related_name='reviews',
                             on_delete=models.CASCADE)
    content = models.TextField()
    date_published = models.DateTimeField('Date Published', auto_now_add=True)
    star_rating = models.CharField(choices=STAR_CHOICES, default='⭐️⭐️⭐️',
                                   max_length=10)
    book = models.ForeignKey(Book, related_name='books',
                             on_delete=models.CASCADE)

    class Meta:
        ordering = ['-date_published']

    def __str__(self):
        return "{} : {}".format(self.star_rating, self.book.title)


class ReadBook(models.Model):
    """
    Model representing a book read by a user

    This model is used to track a users read status of a Book
    """
    object_id = models.PositiveIntegerField()
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE,
                                     null=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE,
                             null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             null=True, blank=True)
    timestamp = models.DateField('Date marked read', auto_now_add=True)
    content_object = GenericForeignKey()

    def __str__(self):
        return "{} read {}".format(self.user, self.book)
