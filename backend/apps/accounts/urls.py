from django.urls import path
from .views import login_view, logout_view, me_view, create_user_view

urlpatterns = [
    path('login/', login_view, name='accounts-login'),
    path('logout/', logout_view, name='accounts-logout'),
    path('me/', me_view, name='accounts-me'),
    path('users/', create_user_view, name='accounts-users'),
]
