from django.urls import path
from django.conf import settings
from .views import *
from django.conf.urls.static import static


urlpatterns = [
    path('',landing,name='landing'),
    path('login/',signin,name='signin'),
    path('home/',home,name='home'),
    path('registration/',registration,name='registration'),
    path('setting/',setting,name='setting'),
    path('signout/',singout,name='signout'),
    path('test/', TestView.as_view(), name='test'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
