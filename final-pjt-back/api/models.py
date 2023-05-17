from django.db import models

# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=50)

class Movie(models.Model):
    title = models.CharField(max_length=100)
    original_title = models.CharField(max_length=100)
    overview = models.TextField()
    release_date = models.DateField()
    popularity = models.FloatField()
    poster_path = models.TextField(null=True)
    genres = models.ManyToManyField(Genre, related_name='movies', blank=True)