from django.contrib import admin
from django.urls import path, include

urlpatterns = [

    path('admin/', admin.site.urls),

    path('accounts/', include('apps.accounts.urls')),

    path('children/', include('apps.children.urls')),

    path('consultant/', include('apps.consultant.urls')),

    path('parents/', include('apps.parents.urls')),

]