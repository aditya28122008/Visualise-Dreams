from django.db import models

# Create your models here.
class Book(models.Model):
    bookSno = models.AutoField(primary_key=True)
    author = models.CharField(max_length=500)
    bookName = models.CharField(max_length=800, default="")
    numberOfChapters = models.IntegerField(default=0)
    category = models.CharField(max_length = 800, default = '')
    desc = models.CharField(max_length=800, default="")
    bookCover = models.ImageField(upload_to="elibrary/books/cover", default="")
    bookPDF = models.FileField(upload_to="elibrary/books/PDF")
    def __str__(self):
        return f"{self.author} - {self.bookName}"