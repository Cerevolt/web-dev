from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    create_user_view,
    login_view,
    logout_view,
    me_view,
    parent_child_links_view,
    pending_approvals_view,
    register_view,
    review_account_view,
    review_parent_child_link_view,
)

urlpatterns = [
    path('register/', register_view, name='accounts-register'),
    path('login/', login_view, name='accounts-login'),
    path('logout/', logout_view, name='accounts-logout'),
    path('me/', me_view, name='accounts-me'),
    path('token/refresh/', TokenRefreshView.as_view(), name='accounts-token-refresh'),
    path('users/', create_user_view, name='accounts-users'),
    path('approvals/pending/', pending_approvals_view, name='accounts-pending-approvals'),
    path(
        'approvals/<int:user_id>/approve/',
        review_account_view,
        {'action': 'approve'},
        name='accounts-approve-account',
    ),
    path(
        'approvals/<int:user_id>/reject/',
        review_account_view,
        {'action': 'reject'},
        name='accounts-reject-account',
    ),
    path('parent-links/pending/', parent_child_links_view, name='accounts-pending-parent-links'),
    path(
        'parent-links/<int:link_id>/verify/',
        review_parent_child_link_view,
        {'action': 'verify'},
        name='accounts-verify-parent-link',
    ),
    path(
        'parent-links/<int:link_id>/reject/',
        review_parent_child_link_view,
        {'action': 'reject'},
        name='accounts-reject-parent-link',
    ),
]
