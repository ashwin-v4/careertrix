from django.urls import path
from django.conf import settings
from .views import *
from django.conf.urls.static import static
from django.conf.urls import handler404



urlpatterns = [
    path('',landing,name='landing'),
    path('login/',signin,name='signin'),
    path('home/', home, name='home'),
    path('registration/',registration,name='registration'),
    path('setting/',setting,name='setting'),
    path('signout/',singout,name='signout'),
]
handler404 = 'app_name.views.error404'

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
