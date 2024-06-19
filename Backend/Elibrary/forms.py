# from django import forms
# from Elibrary.models import Book
# class UploadFileForm(forms.ModelForm):
#     class Meta:
#         model = Book()
#         fields = ("author", "bookName", "numberOfChapters", "bookPDF",)
#         widgets = {
#             "author": forms.TextInput(attrs={
#                 "class": "border-4 rounded-lg flex",
#                 "placeholder": "Author",
#                 "name": "author"
#                 }),
#             "bookName": forms.Textarea(attrs={
#                 "class": "h-200 border-2 w-[999px] flex",
#                 "name": "bookName"
#             }),
#             "numberOfChapters": forms.NumberInput(attrs={
#                 "class": "border-2 px-1 py-2 flex",
#                 "name": "numberOfChapters"
#             }),
#             "bookPDF": forms.FileInput(attrs={
#                 "class": "block my-2 mx-4 flex border-4",
#                 "name": "pdf"
#             }),
#             }
#         labels = {
#             "author": "Writer's Name",
#             "numberOfChapters": "Number Of Chapters",
#             "bookName": "Name Of The Book",
#             "bookPDF": "Book's PDF",
#         }