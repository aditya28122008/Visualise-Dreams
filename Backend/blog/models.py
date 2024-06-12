from django.db import models
from django.utils.text import slugify
from accounts.models import CustomUser

import random
import string

def generate_random_string(length):
    """Generate a random string of letters and digits."""
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

# Create your models here.
class Categories(models.Model):
    sno = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150, unique=True)
    
    def __str__(self):
        return str(self.name)
    
    
class Post(models.Model):
    snoPost = models.AutoField(primary_key=True)
    author = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE, default="", null=True, blank=True)
    title = models.CharField(max_length=200, default="")
    tagline = models.CharField(max_length=100, default="")
    content = models.TextField(default="")
    slug = models.SlugField(unique=True, blank=True, max_length = 800)
    timeStamp = models.DateTimeField(blank=True, auto_now_add=True)
    image = models.FileField(upload_to="blog/images", default="")
    allowed = models.BooleanField(default=False)
    by_admin = models.BooleanField(default=False)
    category = models.ForeignKey(to=Categories, on_delete=models.CASCADE, null=True, blank=True)
    allowd_at = models.DateTimeField(blank=True, null=True)
    blocked_at = models.DateTimeField(blank=True, null=True, auto_now_add=True)
    

    def save(self, *args, **kwargs):
        if not self.slug:
            unique_id = generate_random_string(10)
            self.slug = slugify(f"{self.title}-{unique_id}")
        super().save(*args, **kwargs)
    
    

    def __str__(self):
        return self.title
    
    
    