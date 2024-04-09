from django.core.management.base import BaseCommand
from django.db import connection, reset_queries
from django.db.models import Count
from myapp.models import Author, Book

import timeit

class Command(BaseCommand):
    help = 'Measure average time taken to run commands. It gives average run time of 10 commands.'

    def handle(self, *args, **kwargs):
        # With prefetch_related
        execution_time1 = timeit.timeit('get_total_book_count_with_prefetch_related()', globals=globals(), number=10) / 10
        print(f"Avg time with prefetch_related: {execution_time1}")

        # Without prefetch_related
        execution_time2 = timeit.timeit('get_total_book_count_without_prefetch_related()', globals=globals(), number=10) / 10
        print(f"Avg time without prefetch_related: {execution_time2}")

        print("prefetch_related performance improvement RATIO:", execution_time2 / execution_time1)

        print()
        # With select_related
        execution_time3 = timeit.timeit('get_total_book_count_with_select_related()', globals=globals(), number=10) / 10
        print(f"Avg time with select_related: {execution_time3}")

        # Without select_related
        execution_time4 = timeit.timeit('get_total_book_count_without_select_related()', globals=globals(), number=10) / 10
        print(f"Avg time without select_related: {execution_time4}")

        print("select_related performance improvement RATIO:", execution_time4 / execution_time3)



# Without prefetch_related
def get_total_book_count_without_prefetch_related():
    authors = Author.objects.all()
    count = 0
    for author in authors:
        count += author.book_set.count()
    # print(count)

# With prefetch_related
def get_total_book_count_with_prefetch_related():
    authors = Author.objects.prefetch_related('book_set').all()
    count = 0
    for author in authors:
        count += author.book_set.count()
    # print(count)

# Without select_related
def get_total_book_count_without_select_related():
    books = Book.objects.all()
    total_age = 0 
    for book in books:
        total_age += book.author.age
    # print(total_age // books.count())

# With select_related
def get_total_book_count_with_select_related():
    books = Book.objects.select_related('author').all()
    total_age = 0
    for book in books:
        total_age += book.author.age
    # print(total_age // books.count())
