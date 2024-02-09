from django import forms
from accounts.models import CustomUser as User
class EditProfileStudent(forms.ModelForm):
    class Meta:
        model = User
        fields = ('email', 'nickname', 'bio',)
        widgets = {
            "email": forms.EmailInput(attrs={
                "class": "block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer my-2",
                "placeholder": " ",
            }),
            "nickname": forms.TextInput(attrs={
                "class": "block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer my-2",
                "placeholder": " "
            }),
            "bio": forms.Textarea(attrs={
                "class": "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 my-2",
                "placeholder": " "
            })
        }
        labels = {
            "email": "Email Address",
            "nickname": "Nickname",
            "Bio": "Tell Us About Yourself"
        }


class TBannerIm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('bannerImg',)
        widgets = {
            "bannerImg": forms.FileInput(attrs={
                "class": "block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 cursor-pointer bg-gray-50 focus:outline-none",
            }),
        }
        labels = {
            "bannerImg": "",
        }
class ChProIm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('profile',)
        widgets = {
            "profile": forms.FileInput(attrs={
                "class": "block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 cursor-pointer bg-gray-50 focus:outline-none",
            }),
        }
        labels = {
            "profile": "",
        }