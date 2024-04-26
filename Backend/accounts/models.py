from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
from django.db.models import F
# Create your models here.



class CustomUser(AbstractUser):
    profile = models.FileField(upload_to='user/profile', default="user/profile/blank.png")
    bannerImg = models.FileField(upload_to="user/banner", default="user/banner/blank.png")
    nickname = models.CharField(max_length=800, default="", blank=True, null=True)
    stuClass = models.CharField(default="", blank=True, null=True, max_length=8)    
    teacherStatus = (
        (1, "Student"),
        (2, "Teacher"),
    )
    
    Status = models.IntegerField(choices=teacherStatus, default=4)
    bio = models.TextField(blank=True, default = "Its About Me...!")


    def __str__(self):
        return f"{self.username} {self.first_name} {self.last_name}"
    



