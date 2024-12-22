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
    current_job_title = models.CharField(max_length=255, null=True)
    goal_job_title = models.CharField(max_length=255, null=True)
    education = models.CharField(max_length=255, null=True)
    education_field = models.CharField(max_length=255, null=True)
    graduation_year = models.DateField(null=True)
    technical_skills = models.TextField(null=True, blank=True)
    soft_skills = models.TextField(null=True, blank=True)
    experience_job_title = models.CharField(max_length=255, null=True)
    experience_duration = models.IntegerField(null=True)
    year_of_resignation = models.DateField(null=True, blank=True)
    city1 = models.CharField(max_length=100, null=True, blank=True)
    city2 = models.CharField(max_length=100, null=True, blank=True)
    city3 = models.CharField(max_length=100, null=True, blank=True)
    availability = models.CharField(max_length=10, choices=AVAILABILITY_CHOICES, null=True, blank=True)


    def user_directory_path(instance, filename):
        # file will be uploaded to MEDIA_ROOT/resumes/username.pdf
        return f'resumes/{instance.user.username}.pdf'

    resume = models.FileField(upload_to=user_directory_path, null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s Career Goals"





class GeminiResonse(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,default="null") 
    field = models.CharField(max_length=100, default="null") 
    response = models.CharField(max_length=755)

    class Meta:
        unique_together = ('user', 'field')  
