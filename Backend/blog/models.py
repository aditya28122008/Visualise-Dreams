from django.db import models
from django.utils.text import slugify
from accounts.models import CustomUser
import random
import string

def generate_random_string(length=6):
    """Generate a random string of letters and digits."""
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

# Create your models here.
class Post(models.Model):
    snoPost = models.AutoField(primary_key=True)
    author = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE, default="")
    title = models.CharField(max_length=200, default="")
    tagline = models.CharField(max_length=100, default="")
    content = models.TextField(default="")
    slug = models.SlugField(unique=True, blank=True, max_length = 999999999999)
    timeStamp = models.DateTimeField(blank=True, auto_now_add=True)
    image = models.ImageField(upload_to="blog/images", default="")
    allowed = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.slug:
            # Generate slug from the title
            # base_slug = slugify(self.title)
            unique_id = generate_random_string()
            self.slug = f"{unique_id}"
        super().save(*args, **kwargs)
    
    

    def __str__(self):
        return self.title + ' by ' + str(self.author.first_name) + " " + str(self.author.last_name)