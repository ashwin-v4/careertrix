from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from django.contrib.auth.hashers import make_password
from django.contrib.auth.decorators import login_required

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
                login(request, user)
                return redirect('home')
            else:
                messages.error(request, "Username or password does not exist")
        else:
            username = request.POST.get('username')
            password = request.POST.get('password')
            email = request.POST.get('email')
            if User.objects.filter(username=username).exists():
                messages.error(request, "User already exists")
            else:
                user = User.objects.create(username=username, password=make_password(password),first_name=username,email= email)
                user.save()
                login(request,user)
                return redirect('home')
    return render(request,'login.html',{'messages': messages.get_messages(request)})
    



@login_required
def home(request):
    return render(request, 'home.html')
