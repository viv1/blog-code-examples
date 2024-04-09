from django.core.management.base import BaseCommand
from faker import Faker
from myapp.models import Author, Book
import random

class Command(BaseCommand):
    help = 'Populates the database with random authors and books'

    def add_arguments(self, parser):
        parser.add_argument('authors', type=int, help='The number of authors to create')
        parser.add_argument('books', type=int, help='The number of books to create per author')

    def handle(self, *args, **kwargs):
        faker = Faker()

        authors_count = kwargs['authors']
        max_books_per_author = kwargs['books']

        book_count = 0
        for _ in range(authors_count):
            author = Author.objects.create(name=faker.name(), age=random.randint(10, 120))
            # Generate random number of books upto max_count
            book_count_for_this_author = random.randint(1, max_books_per_author)
            book_count += book_count_for_this_author
            for _ in range(book_count_for_this_author):
                Book.objects.create(title=faker.sentence(), author=author)

        self.stdout.write(self.style.SUCCESS(f'Successfully added {authors_count} authors and {book_count} books'))