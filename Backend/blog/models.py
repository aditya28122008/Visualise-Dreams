from django.db import models
from django.utils.text import slugify
from accounts.models import CustomUser
from datetime import datetime
# Create your models here.
class Post(models.Model):
    snoPost = models.AutoField(primary_key=True)
    author = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE, default="")
    title = models.CharField(max_length=200, default="")
    tagline = models.CharField(max_length=100, default="")
    content = models.TextField(default="")
    slug = models.SlugField(unique=True, blank=True, max_length=600000, default="")
    timeStamp = models.DateTimeField(blank=True, auto_now_add=True)
    image = models.ImageField(upload_to="blog/images", default="")
    allowed = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title + str(self.snoPost))
        super(Post, self).save(*args, **kwargs)
    
    

    def __str__(self):
        return self.title + ' by ' + str(self.author.first_name) + " " + str(self.author.last_name)