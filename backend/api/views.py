from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login , logout
from .models import CareerGoal
from django.contrib.auth.hashers import make_password
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_backends
from django.contrib.auth import update_session_auth_hash
from .gemini_api import get_gemini_response
from .utils import extract_text_from_resume, extract_skills_from_text

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
                messages.error(request, "Username or password does not exist")  # Use messages.error here
        
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
    
    return render(request, 'login.html')


@login_required
def home(request):
    username = request.user.username

    if request.method == 'POST':
        job = request.POST.get('job-dropdown')
        user_profile = CareerGoal.objects.get(user__username=username)
        entered_skills = user_profile.technical_skills

        resume_text = ""
        if 'resume-upload' in request.FILES:
            resume_file = request.FILES['resume-upload']
            resume_text = extract_text_from_resume(resume_file)

        all_skills = entered_skills  
        if resume_text:
            extracted_skills = extract_skills_from_text(resume_text)
            all_skills += ", " + ", ".join(extracted_skills)  

        user_profile.technical_skills = all_skills
        user_profile.save()

        input_text = f"I have the following skills: {all_skills}. I want the job {job}. Please give me a markdown of the required skills I am missing."
        gemini_response = get_gemini_response(input_text)

        return render(request, 'roadmap.html', {'gemini_response': gemini_response})

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
            availability=request.POST.get('availability'),
            resume=request.FILES.get('resume-upload')
        )

        if career_goal.resume:
            resume_file = career_goal.resume
            resume_text = extract_text_from_resume(resume_file)  
            extracted_skills = extract_skills_from_text(resume_text)
            if extracted_skills:
                career_goal.technical_skills += ", " + ", ".join(extracted_skills)  

        career_goal.save()
        return redirect('home')
    return render(request, 'register.html')


@login_required
def setting(request):
    if request.method == 'POST':
        form_type = request.POST.get('form_type')

        if form_type == 'profile_info':
            first_name = request.POST.get('first-name')
            last_name = request.POST.get('last-name')
            username = request.POST.get('username')
            email = request.POST.get('email')
            
            request.user.first_name = first_name
            request.user.last_name = last_name
            request.user.username = username
            request.user.email = email
            request.user.save()
            
            messages.success(request, 'Profile info updated successfully!')

        elif form_type == 'password_change':
            current_password = request.POST.get('current-password')
            new_password = request.POST.get('new-password')
            confirm_password = request.POST.get('confirm-password')

            if not request.user.check_password(current_password):
                messages.error(request, 'Current password is incorrect.')
                return redirect('setting')

            if new_password != confirm_password:
                messages.error(request, 'Passwords do not match.')
                return redirect('setting')
            request.user.set_password(new_password)
            request.user.save()
            update_session_auth_hash(request, request.user)

            messages.success(request, 'Password updated successfully!')

        return redirect('setting')
    context = {
        'user': request.user,
    }
    return render(request, 'settings.html', context)

from django.views.generic import TemplateView

class TestView(TemplateView):
    template_name = 'test.html'

def singout(request):
    logout(request)
    return redirect('landing')

