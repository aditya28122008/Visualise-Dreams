from django import forms
from Elibrary.models import Book


class UploadFileForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ("author", "bookName", "bookPDF",)
        widgets = {
            "author": forms.TextInput(attrs={
                "class": "border-4 rounded-lg flex",
                "placeholder": "Author",
                "name": "author"
                }),
            "bookName": forms.Textarea(attrs={
                "class": "h-200 border-2 w-[999px] flex",
                "name": "bookName"
            }),
            "bookPDF": forms.FileInput(attrs={
                "class": "block my-2 mx-4 flex border-4",
                "name": "pdf"
            }),
            }
        labels = {
            "author": "Writer's Name",
            "bookName": "Name Of The Book",
            "bookPDF": "Book's PDF",
        }