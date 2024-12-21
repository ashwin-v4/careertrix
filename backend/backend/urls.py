from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import RedirectView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", RedirectView.as_view(url="/api/")),
    path("api/", include('api.urls')),
    path("accounts/", include("allauth.urls")),
]

# Serve static files correctly in both development and production
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
else:
    # In production, static files are served by the web server, so this should work
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
