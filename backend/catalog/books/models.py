from django.db import models

from .choices import TYPE_CHOICES, GENRE_CHOICES


class Book(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    language = models.CharField(max_length=50)
    type = models.CharField(choices=TYPE_CHOICES, default='fiction',
                            max_length=50)
    genre = models.CharField(choices=GENRE_CHOICES, default='fantasy',
                             max_length=50)
    
