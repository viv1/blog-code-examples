from django.db import models
from django.core.validators import MaxValueValidator

# Create your models here.

class Author(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField(validators=[MaxValueValidator(100)])

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
