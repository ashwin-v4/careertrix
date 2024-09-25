from django.contrib import admin
from .models import CareerGoal

class CareerGoalAdmin(admin.ModelAdmin):
    list_display = ('user', 'current_job_title', 'goal_job_title', 'education', 'availability')
    search_fields = ('user__username', 'goal_job_title', 'current_job_title', 'education')

admin.site.register(CareerGoal, CareerGoalAdmin)
