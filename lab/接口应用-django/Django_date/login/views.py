from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from . import models

# Create your views here.
def is_festival(date):
    year, month, day = date.split('-')
    if month == '01' and day == '01':
        return '元旦'
    elif month == '12' and day == '25':
        return '圣诞节'
    elif month == '10' and day == '01':
        return '国庆节'
    else:
        return None

def index (request):
    context = {}
    if request.session['is_login'] == True and request.method == 'POST':
        date = request.POST.get('date')
        context['result'] = is_festival(date)
    return render(request, 'index.html', context=context)

def loginP (request):
    request.session['is_login'] = False
    if request.method == 'POST':
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)

        if username and password:
            try:
                user = models.User.objects.get(name=username)
                if user.password == password:
                    request.session['is_login'] = True
                    request.session['user_name'] = username
                    return redirect('index')
                else:
                    message = "密码不正确！"
            except:
                message = "用户名不存在！"
        return render(request, 'login.html', {"message": message})

    return render(request,'login.html')

def register (request):
    if request.method == 'POST':
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)

        if username and password:
            try:
                user = models.User.objects.get(name=username)
                message = "用户名已存在！"
            except:
                models.User.objects.create(name=username, password=password)
                return redirect('login')
        return render(request, 'register.html', {"message": message})
    return render(request,'register.html')

def logout(request):
    request.session['is_login'] = False
    request.session['user_name'] = None
    return redirect('login')