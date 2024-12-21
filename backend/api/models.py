from django.db import models
from django.contrib.auth.models import User


class CareerGoal(models.Model):
    AVAILABILITY_CHOICES = [
        ('full-time', 'Full Time'),
        ('part-time', 'Part Time'),
        ('freelance', 'Freelance'),
        ('internship', 'Internship'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    current_job_title = models.CharField(max_length=255)
    goal_job_title = models.CharField(max_length=255)
    education = models.CharField(max_length=255)
    education_field = models.CharField(max_length=255)
    graduation_year = models.DateField()
    technical_skills = models.TextField()
    soft_skills = models.TextField()
    experience_job_title = models.CharField(max_length=255)
    experience_duration = models.IntegerField()
    year_of_resignation = models.DateField()
    city1 = models.CharField(max_length=100, null=True) 
    city2 = models.CharField(max_length=100, null=True) 
    city3 = models.CharField(max_length=100, null=True) 
    availability = models.CharField(max_length=10, choices=AVAILABILITY_CHOICES)
    
    # Custom upload path for storing resume as username.pdf
    def user_directory_path(instance, filename):
        # file will be uploaded to MEDIA_ROOT/resumes/username.pdf
        return f'resumes/{instance.user.username}.pdf'

    resume = models.FileField(upload_to=user_directory_path, null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s Career Goals"




class GeminiResonse(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    response = models.CharField(max_length=255)