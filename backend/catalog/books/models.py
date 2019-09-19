from django.db import models

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
    isbn = models.CharField('ISBN', max_length=13)
    cover_image = models.ImageField(upload_to='book_covers',
                                    blank=False, null=True)
    language = models.ForeignKey(
        Language, on_delete=models.SET_NULL, null=True)
    publication_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return "{} ({}) by {}".format(
            self.title, self.isbn, self.author.last_name)


class Review(models.Model):
    """
    Model representing a Book Review by a User
    """
    user = models.ForeignKey(User, related_name='reviews',
                             on_delete=models.CASCADE)
    content = models.TextField()
    date_published = models.DateTimeField('Date Published', auto_now_add=True)
    star_rating = models.CharField(choices=STAR_CHOICES, default='⭐️⭐️⭐️',
                                   max_length=10)
    book = models.ForeignKey(Book, related_name='books',
                             on_delete=models.CASCADE)

    def __str__(self):
        return "{} : {}".format(self.star_rating, self.book.title)
