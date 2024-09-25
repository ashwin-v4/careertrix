from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from .models import CareerGoal
from django.contrib.auth.hashers import make_password
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_backends


def landing(request):
    if request.user.is_authenticated:
        return redirect('home')
    return render(request, 'landing.html')


def signin(request):
    if request.user.is_authenticated:
        return redirect('home')
    if request.method == "POST":
        name = request.POST.get("check")
        if name == "old_user":
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                # Add backend attribute
                backend = get_backends()[0].__class__.__name__
                user.backend = f'django.contrib.auth.backends.{backend}'
                login(request, user)
                return redirect('home')
            else:
                error_message = "Username or password does not exist"
        else:
            username = request.POST.get('username')
            password = request.POST.get('password')
            email = request.POST.get('email')
            if User.objects.filter(username=username).exists():
                messages.error(request, "User already exists")
            else:
                user = User.objects.create(username=username, password=make_password(password), first_name=username, email=email)
                user.save()
                # Add backend attribute
                backend = get_backends()[0].__class__.__name__
                user.backend = f'django.contrib.auth.backends.{backend}'
                login(request, user)
                return redirect('registration')
    return render(request, 'login.html', {'error_message': "Test message"})


@login_required
def home(request):
    return render(request, 'home.html')

@login_required
def registration(request):
    if request.method == 'POST':
        career_goal = CareerGoal(
            user=request.user,
            current_job_title=request.POST.get('current-job-title'),
            goal_job_title=request.POST.get('goal-job-title'),
            education=request.POST.get('education'),
            education_field=request.POST.get('education-field'),
            graduation_year=request.POST.get('graduation-year'),
            technical_skills=request.POST.get('technical-skills'),
            soft_skills=request.POST.get('soft-skills'),
            experience_job_title=request.POST.get('experience-job-title'),
            experience_duration=request.POST.get('experience-duration'),
            year_of_resignation=request.POST.get('year-of-resignation'),
            city1=request.POST.get('city1'),
            city2=request.POST.get('city2'),
            city3=request.POST.get('city3'),
            availability=request.POST.get('availability')
        )
        career_goal.save()
        return redirect('home')
    return render(request,'register.html')