from django.db import models

# Create your models here.

class BookCategory(models.Model):
    sno = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150, unique=True)

    def __str__(self):
        return str(self.name)
    
    
class Book(models.Model):
    bookSno = models.AutoField(primary_key=True)
    author = models.CharField(max_length=500)
    bookName = models.CharField(max_length=800, default="")
    numberOfChapters = models.IntegerField(default=0)
    category = models.ForeignKey(to=BookCategory, on_delete=models.CASCADE, null=True, blank=True)
    desc = models.CharField(max_length=800, default="")
    bookCover = models.ImageField(upload_to="elibrary/books/cover", default="")
    bookPDF = models.FileField(upload_to="elibrary/books/PDF")
    def __str__(self):
        return f"{self.author} - {self.bookName}"