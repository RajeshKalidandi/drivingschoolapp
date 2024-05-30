from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_learner = models.BooleanField(default=False)
    is_instructor = models.BooleanField(default=False)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField()
    qualifications = models.TextField(null=True, blank=True)
    availability = models.TextField()

class DrivingSchool(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    instructors = models.ManyToManyField(User, related_name='driving_schools')

class Booking(models.Model):
    learner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lessons')
    date = models.DateTimeField()
    status = models.CharField(max_length=50)

class Payment(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(max_length=50)

class Review(models.Model):
    learner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews_received')
    rating = models.IntegerField()
    comment = models.TextField()

class LessonResource(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    instructor = models.ForeignKey(User, on_delete=models.CASCADE)

