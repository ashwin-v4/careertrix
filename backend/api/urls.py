from django.urls import path
from .views import *


urlpatterns = [
    path('',landing,name='landing'),
    path('login/',signin,name='signin'),
    path('home/',home,name='home'),
    path('registration/',registration,name='registration'),
    path('settings/',settings,name='settings'),
    path('signout/',singout,name='signout'),
]
