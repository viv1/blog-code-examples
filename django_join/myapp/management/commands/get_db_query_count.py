from django.core.management.base import BaseCommand
from django.db import connection, reset_queries
from myapp.models import Author, Book

class Command(BaseCommand):
    help = 'Measure number of db queries in each command'

    def handle(self, *args, **kwargs):

        # Measuring for prefetch_related
        reset_queries()
        authors = Author.objects.prefetch_related('book_set').all()
        for author in authors:
            temp = author.book_set.count()
        count1 = len(connection.queries)
        print(f"Queries with prefetch_related: {count1}")

        reset_queries()
        authors = Author.objects.all()
        for author in authors:
            temp = author.book_set.count()
        count2 = len(connection.queries)
        print(f"Queries without prefetch_related: {count2}")

        print(f"Additional Queries: {count2 - count1}")
        print()

        # Measuring for select_related
        reset_queries()
        books = Book.objects.select_related('author').all()
        for book in books:
            temp = book.author.name
        count3 = len(connection.queries)
        print(f"Queries with select_related: {count3}")

        reset_queries()
        books = Book.objects.all()
        for book in books:
            temp = book.author.name
        count4 = len(connection.queries)
        print(f"Queries without select_related: {count4}")

        print(f"Additional Queries: {count4 - count3}")



        
