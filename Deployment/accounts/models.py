from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.



class CustomUser(AbstractUser):
    profile = models.FileField(upload_to='user/profile', default=f"user/blank.jpg")
    bannerImg = models.FileField(upload_to="user/banner", default=f"user/blank.jpg")
    nickname = models.CharField(max_length=800, default="", blank=True, null=True)
    teacherStatus = (
        ("Student", "Student"),
        ("Teacher", "Teacher"),
        ("Staff", "Staff"),
    )
    
    Status = models.CharField(choices=teacherStatus, default="Student", max_length=20)
    bio = models.TextField(blank=True, default = "Its About Me...!", max_length=400)
    
    
    def save(self, *args, **kwargs):
        if not self.first_name:
            self.first_name = "Name"
        if not self.last_name:
            self.last_name = "Surname"
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} {self.first_name} {self.last_name}"