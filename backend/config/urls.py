from django.contrib import admin
from django.urls import path, include

urlpatterns = [

    path('admin/', admin.site.urls),

    path('accounts/', include('apps.accounts.urls')),

    path('children/', include('apps.children.urls')),

    path('consultant/', include('apps.consultant.urls')),

    path('parents/', include('apps.parents.urls')),

    path('adminpanel/', include('apps.adminpanel.urls')),

    path('school/', include('apps.school.urls')),

    path('reports/', include('apps.reports.urls')),

    path('chatbot/', include('apps.chatbot.urls')),

]



