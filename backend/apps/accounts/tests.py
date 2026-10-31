from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework import status

from apps.accounts.models import Profile
from apps.accounts.permissions import IsAdmin


class AccountsAuthTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser(username='admin@test.com', email='admin@test.com', password='Pass1234!')
        Profile.objects.create(user=self.admin, role='admin', normalized_email='admin@test.com')
        self.parent = User.objects.create_user(username='parent@test.com', email='parent@test.com', password='Pass1234!')
        Profile.objects.create(user=self.parent, role='parent', normalized_email='parent@test.com')
        self.inactive = User.objects.create_user(username='inactive@test.com', email='inactive@test.com', password='Pass1234!')
        self.inactive.is_active = False
        self.inactive.save()
        Profile.objects.create(user=self.inactive, role='parent', normalized_email='inactive@test.com')
        self.noprofile = User.objects.create_user(username='np@test.com', email='np@test.com', password='Pass1234!')


    def test_login_success(self):
        resp = self.client.post('/accounts/login/', {'email': 'admin@test.com', 'password': 'Pass1234!'}, format='json')
        self.assertEqual(resp.status_code, 200)
        self.assertIn('access', resp.data)
        self.assertIn('refresh', resp.data)
        self.assertIn('user', resp.data)
        self.assertEqual(resp.data['user']['email'], 'admin@test.com')
        self.assertIn('role', resp.data['user'])

    def test_login_email_case_insensitive(self):
        resp = self.client.post('/accounts/login/', {'email': 'ADMIN@TEST.COM', 'password': 'Pass1234!'}, format='json')
        self.assertEqual(resp.status_code, 200)

    def test_login_invalid(self):
        resp = self.client.post('/accounts/login/', {'email': 'admin@test.com', 'password': 'wrong'}, format='json')
        self.assertEqual(resp.status_code, 401)

    def test_login_inactive(self):
        resp = self.client.post('/accounts/login/', {'email': 'inactive@test.com', 'password': 'Pass1234!'}, format='json')
        self.assertEqual(resp.status_code, 401)

    def test_login_no_profile(self):
        resp = self.client.post('/accounts/login/', {'email': 'np@test.com', 'password': 'Pass1234!'}, format='json')
        self.assertEqual(resp.status_code, 401)

    def test_me_authenticated(self):
        resp = self.client.post('/accounts/login/', {'email': 'parent@test.com', 'password': 'Pass1234!'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        me = self.client.get('/accounts/me/')
        self.assertEqual(me.status_code, 200)
        self.assertEqual(me.data['email'], 'parent@test.com')

    def test_me_unauthenticated(self):
        resp = self.client.get('/accounts/me/')
        self.assertIn(resp.status_code, [401, 403])

    def test_create_user_admin_only(self):
        resp = self.client.post('/accounts/login/', {'email': 'parent@test.com', 'password': 'Pass1234!'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.post('/accounts/users/', {'email': 'x@y.com', 'password': 'Pass1234!', 'role': 'child'}, format='json')
        self.assertEqual(r.status_code, 403)

    def test_admin_create_user(self):
        resp = self.client.post('/accounts/login/', {'email': 'admin@test.com', 'password': 'Pass1234!'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.post('/accounts/users/', {'email': 'child1@test.com', 'password': 'Pass1234!', 'role': 'child', 'first_name': 'A', 'last_name': 'B'}, format='json')
        self.assertEqual(r.status_code, 201)
        self.assertNotIn('password', r.data)

    def test_admin_cannot_create_admin(self):
        resp = self.client.post('/accounts/login/', {'email': 'admin@test.com', 'password': 'Pass1234!'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.post('/accounts/users/', {'email': 'newadmin@test.com', 'password': 'Pass1234!', 'role': 'admin'}, format='json')
        self.assertEqual(r.status_code, 400)


class AdminPermissionTests(APITestCase):
    def test_superuser_with_admin_role_allowed(self):
        user = User.objects.create_superuser(username='sup@t.com', email='sup@t.com', password='Pass1234!')
        Profile.objects.create(user=user, role='admin', normalized_email='sup@t.com')
        class Dummy:
            pass
        req = Dummy()
        req.user = user
        p = IsAdmin()
        self.assertTrue(p.has_permission(req, None))

    def test_non_superuser_with_admin_role_denied(self):
        user = User.objects.create_user(username='na@t.com', email='na@t.com', password='Pass1234!')
        Profile.objects.create(user=user, role='admin', normalized_email='na@t.com')
        class Dummy:
            pass
        req = Dummy()
        req.user = user
        p = IsAdmin()
        self.assertFalse(p.has_permission(req, None))

    def test_superuser_without_profile_denied(self):
        user = User.objects.create_superuser(username='np@t.com', email='np@t.com', password='Pass1234!')
        class Dummy:
            pass
        req = Dummy()
        req.user = user
        p = IsAdmin()
        self.assertFalse(p.has_permission(req, None))

    def test_superuser_with_parent_role_denied(self):
        user = User.objects.create_superuser(username='sp@t.com', email='sp@t.com', password='Pass1234!')
        Profile.objects.create(user=user, role='parent', normalized_email='sp@t.com')
        class Dummy:
            pass
        req = Dummy()
        req.user = user
        p = IsAdmin()
        self.assertFalse(p.has_permission(req, None))

    def test_unauthenticated_denied(self):
        class Dummy:
            pass
        req = Dummy()
        req.user = None
        p = IsAdmin()
        self.assertFalse(p.has_permission(req, None))


    def test_duplicate_email(self):
        resp = self.client.post('/accounts/login/', {'email': 'admin@test.com', 'password': 'Pass1234!'}, format='json')
        self.assertEqual(resp.status_code, 200)
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.post('/accounts/users/', {'email': 'PARENT@TEST.COM', 'password': 'Pass1234!', 'role': 'child'}, format='json')
        self.assertIn(r.status_code, [400])

    def test_logout_blacklist(self):
        resp = self.client.post('/accounts/login/', {'email': 'parent@test.com', 'password': 'Pass1234!'}, format='json')
        self.assertEqual(resp.status_code, 200)
        access = resp.data['access']
        refresh = resp.data['refresh']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.post('/accounts/logout/', {'refresh': refresh}, format='json')
        self.assertEqual(r.status_code, 200)
        from rest_framework_simplejwt.tokens import RefreshToken
        from rest_framework_simplejwt.exceptions import TokenError
        try:
            token = RefreshToken(refresh)
            token.check_blacklist()
            self.fail('should be blacklisted')
        except TokenError:
            pass

