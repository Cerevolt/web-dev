from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework import status

from apps.accounts.models import ParentChildLink, Profile
from apps.accounts.permissions import IsAdmin


class AccountsAuthTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser(username='admin@test.com', email='admin@test.com', password='Pass1234!')
        Profile.objects.create(user=self.admin, role='admin', normalized_email='admin@test.com', status='approved')
        self.parent = User.objects.create_user(username='parent@test.com', email='parent@test.com', password='Pass1234!')
        Profile.objects.create(user=self.parent, role='parent', normalized_email='parent@test.com', status='approved')
        self.inactive = User.objects.create_user(username='inactive@test.com', email='inactive@test.com', password='Pass1234!')
        self.inactive.is_active = False
        self.inactive.save()
        Profile.objects.create(user=self.inactive, role='parent', normalized_email='inactive@test.com', status='approved')
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


class PublicRegistrationTests(APITestCase):
    REGISTER_URL = '/accounts/register/'
    PASSWORD = 'StrongPass123!'

    def test_register_creates_parent_account(self):
        resp = self.client.post(self.REGISTER_URL, {
            'email': 'newparent@test.com',
            'password': self.PASSWORD,
            'first_name': 'New',
            'last_name': 'Parent',
        }, format='json')
        self.assertEqual(resp.status_code, 201)
        self.assertEqual(resp.data['role'], 'parent')
        self.assertNotIn('password', resp.data)
        user = User.objects.get(email='newparent@test.com')
        self.assertEqual(user.profile.role, 'parent')
        self.assertEqual(user.profile.normalized_email, 'newparent@test.com')
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertTrue(user.check_password(self.PASSWORD))

    def test_registration_ignores_privileged_fields(self):
        resp = self.client.post(self.REGISTER_URL, {
            'email': 'parentreg@test.com',
            'password': self.PASSWORD,
            'role': 'parent',
            'is_superuser': True,
            'is_staff': True,
            'status': 'approved',
        }, format='json')
        self.assertEqual(resp.status_code, 201)
        user = User.objects.get(email='parentreg@test.com')
        self.assertFalse(user.is_superuser)
        self.assertFalse(user.is_staff)

    def test_all_five_roles_register_approved_and_login_immediately(self):
        for role in ('parent', 'child', 'admin', 'consultant', 'school'):
            email = f'public-{role}@test.com'
            reg = self.client.post(self.REGISTER_URL, {
                'email': email,
                'password': self.PASSWORD,
                'role': role,
            }, format='json')
            self.assertEqual(reg.status_code, 201)
            self.assertEqual(reg.data['status'], 'approved')

            user = User.objects.get(email=email)
            self.assertEqual(user.profile.role, role)
            self.assertEqual(user.profile.status, 'approved')
            self.assertTrue(user.check_password(self.PASSWORD))
            if role == 'admin':
                self.assertTrue(user.is_superuser)
                self.assertTrue(user.is_staff)
            else:
                self.assertFalse(user.is_superuser)
                self.assertFalse(user.is_staff)

            login = self.client.post('/accounts/login/', {
                'email': email,
                'password': self.PASSWORD,
            }, format='json')
            self.assertEqual(login.status_code, 200)
            self.assertEqual(login.data['user']['role'], role)
            self.assertIn('access', login.data)
            self.assertIn('refresh', login.data)

    def test_child_registration_needs_no_parent_email_or_link(self):
        resp = self.client.post(self.REGISTER_URL, {
            'email': 'standalone-child@test.com',
            'password': self.PASSWORD,
            'role': 'child',
        }, format='json')
        self.assertEqual(resp.status_code, 201)
        self.assertEqual(resp.data['status'], 'approved')
        self.assertEqual(ParentChildLink.objects.count(), 0)

    def test_registration_creates_no_pending_approvals(self):
        for role in ('consultant', 'school', 'child'):
            resp = self.client.post(self.REGISTER_URL, {
                'email': f'noapproval-{role}@test.com',
                'password': self.PASSWORD,
                'role': role,
            }, format='json')
            self.assertEqual(resp.status_code, 201)
            self.assertEqual(resp.data['status'], 'approved')
        self.assertFalse(Profile.objects.filter(status='pending').exists())

    def test_registration_normalizes_email(self):
        resp = self.client.post(self.REGISTER_URL, {
            'email': '  MixedCase@Test.COM  ',
            'password': self.PASSWORD,
        }, format='json')
        self.assertEqual(resp.status_code, 201)
        user = User.objects.get(email='mixedcase@test.com')
        self.assertEqual(user.profile.normalized_email, 'mixedcase@test.com')

    def test_registration_rejects_duplicate_email(self):
        existing = User.objects.create_user(
            username='taken@test.com', email='taken@test.com', password='Pass1234!'
        )
        Profile.objects.create(user=existing, role='parent', normalized_email='taken@test.com', status='approved')
        resp = self.client.post(self.REGISTER_URL, {
            'email': 'TAKEN@TEST.COM',
            'password': self.PASSWORD,
        }, format='json')
        self.assertEqual(resp.status_code, 400)

    def test_registration_rejects_weak_password(self):
        resp = self.client.post(self.REGISTER_URL, {
            'email': 'weakpw@test.com',
            'password': '123',
        }, format='json')
        self.assertEqual(resp.status_code, 400)
        self.assertFalse(User.objects.filter(email='weakpw@test.com').exists())

    def test_login_succeeds_after_registration(self):
        reg = self.client.post(self.REGISTER_URL, {
            'email': 'loginparent@test.com',
            'password': self.PASSWORD,
        }, format='json')
        self.assertEqual(reg.status_code, 201)
        resp = self.client.post('/accounts/login/', {
            'email': 'LOGINPARENT@TEST.COM',
            'password': self.PASSWORD,
        }, format='json')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['user']['role'], 'parent')
        self.assertIn('access', resp.data)


class AdminPermissionTests(APITestCase):
    def test_superuser_with_admin_role_allowed(self):
        user = User.objects.create_superuser(username='sup@t.com', email='sup@t.com', password='Pass1234!')
        Profile.objects.create(user=user, role='admin', normalized_email='sup@t.com', status='approved')
        class Dummy:
            pass
        req = Dummy()
        req.user = user
        p = IsAdmin()
        self.assertTrue(p.has_permission(req, None))

    def test_non_superuser_with_admin_role_denied(self):
        user = User.objects.create_user(username='na@t.com', email='na@t.com', password='Pass1234!')
        Profile.objects.create(user=user, role='admin', normalized_email='na@t.com', status='approved')
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
        Profile.objects.create(user=user, role='parent', normalized_email='sp@t.com', status='approved')
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
        admin = User.objects.create_superuser(username='admin2@test.com', email='admin2@test.com', password='Pass1234!')
        Profile.objects.create(user=admin, role='admin', normalized_email='admin2@test.com', status='approved')
        existing = User.objects.create_user(username='dup@test.com', email='dup@test.com', password='Pass1234!')
        Profile.objects.create(user=existing, role='parent', normalized_email='dup@test.com', status='approved')
        resp = self.client.post('/accounts/login/', {'email': 'admin2@test.com', 'password': 'Pass1234!'}, format='json')
        self.assertEqual(resp.status_code, 200)
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.post('/accounts/users/', {'email': 'DUP@TEST.COM', 'password': 'Pass1234!', 'role': 'child'}, format='json')
        self.assertIn(r.status_code, [400])



    def test_logout_blacklist(self):
        parent = User.objects.create_user(username='parent2@test.com', email='parent2@test.com', password='Pass1234!')
        Profile.objects.create(user=parent, role='parent', normalized_email='parent2@test.com', status='approved')
        resp = self.client.post('/accounts/login/', {'email': 'parent2@test.com', 'password': 'Pass1234!'}, format='json')
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


class AdminApprovalTests(APITestCase):
    PENDING_URL = '/accounts/approvals/pending/'
    PASSWORD = 'Pass1234!'

    def make_user(self, email, role, status, is_superuser=False):
        if is_superuser:
            user = User.objects.create_superuser(username=email, email=email, password=self.PASSWORD)
        else:
            user = User.objects.create_user(username=email, email=email, password=self.PASSWORD)
        Profile.objects.create(user=user, role=role, normalized_email=email, status=status)
        return user

    def setUp(self):
        self.admin = self.make_user('approval-admin@test.com', 'admin', 'approved', is_superuser=True)
        self.parent = self.make_user('approval-parent@test.com', 'parent', 'approved')
        self.pending_consultant = self.make_user('pending-cons@test.com', 'consultant', 'pending')
        self.pending_school = self.make_user('pending-school@test.com', 'school', 'pending')
        self.approved_consultant = self.make_user('approved-cons@test.com', 'consultant', 'approved')
        self.pending_child = self.make_user('pending-child@test.com', 'child', 'pending')

    def test_pending_list_requires_admin(self):
        resp = self.client.get(self.PENDING_URL)
        self.assertIn(resp.status_code, [401, 403])
        self.client.force_authenticate(user=self.parent)
        resp = self.client.get(self.PENDING_URL)
        self.assertEqual(resp.status_code, 403)

    def test_admin_can_list_pending_requests(self):
        self.client.force_authenticate(user=self.admin)
        resp = self.client.get(self.PENDING_URL)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(
            {item['id'] for item in resp.data},
            {self.pending_consultant.id, self.pending_school.id},
        )
        for item in resp.data:
            self.assertNotIn('password', item)
            self.assertNotIn('access', item)

    def test_admin_approve_consultant(self):
        self.client.force_authenticate(user=self.admin)
        resp = self.client.post(
            f'/accounts/approvals/{self.pending_consultant.id}/approve/', {}, format='json'
        )
        self.assertEqual(resp.status_code, 200)
        profile = Profile.objects.get(user=self.pending_consultant)
        self.assertEqual(profile.status, 'approved')
        user = User.objects.get(pk=self.pending_consultant.pk)
        self.assertTrue(user.is_active)
        self.assertNotIn('password', resp.data)

    def test_admin_reject_school(self):
        self.client.force_authenticate(user=self.admin)
        resp = self.client.post(
            f'/accounts/approvals/{self.pending_school.id}/reject/', {}, format='json'
        )
        self.assertEqual(resp.status_code, 200)
        profile = Profile.objects.get(user=self.pending_school)
        self.assertEqual(profile.status, 'rejected')
        user = User.objects.get(pk=self.pending_school.pk)
        self.assertTrue(user.is_active)

    def test_non_admin_cannot_approve(self):
        self.client.force_authenticate(user=self.parent)
        resp = self.client.post(
            f'/accounts/approvals/{self.pending_consultant.id}/approve/', {}, format='json'
        )
        self.assertEqual(resp.status_code, 403)
        profile = Profile.objects.get(user=self.pending_consultant)
        self.assertEqual(profile.status, 'pending')

    def test_admin_cannot_review_invalid_role(self):
        self.client.force_authenticate(user=self.admin)
        resp = self.client.post(
            f'/accounts/approvals/{self.pending_child.id}/approve/', {}, format='json'
        )
        self.assertEqual(resp.status_code, 400)
        profile = Profile.objects.get(user=self.pending_child)
        self.assertEqual(profile.status, 'pending')

    def test_admin_cannot_reprocess_request(self):
        self.client.force_authenticate(user=self.admin)
        first = self.client.post(
            f'/accounts/approvals/{self.pending_consultant.id}/approve/', {}, format='json'
        )
        self.assertEqual(first.status_code, 200)
        second = self.client.post(
            f'/accounts/approvals/{self.pending_consultant.id}/reject/', {}, format='json'
        )
        self.assertEqual(second.status_code, 400)
        profile = Profile.objects.get(user=self.pending_consultant)
        self.assertEqual(profile.status, 'approved')

    def test_admin_review_missing_user(self):
        self.client.force_authenticate(user=self.admin)
        resp = self.client.post('/accounts/approvals/999999/approve/', {}, format='json')
        self.assertEqual(resp.status_code, 404)


class ParentLinkApprovalTests(APITestCase):
    PENDING_URL = '/accounts/parent-links/pending/'
    PASSWORD = 'Pass1234!'

    def make_user(self, email, role, status):
        user = User.objects.create_user(username=email, email=email, password=self.PASSWORD)
        Profile.objects.create(user=user, role=role, normalized_email=email, status=status)
        return user

    def setUp(self):
        self.parent = self.make_user('link-parent@test.com', 'parent', 'approved')
        self.other_parent = self.make_user('other-parent@test.com', 'parent', 'approved')
        self.child = self.make_user('link-child@test.com', 'child', 'pending')
        self.other_child = self.make_user('other-child@test.com', 'child', 'pending')
        self.not_child = self.make_user('not-child@test.com', 'parent', 'pending')
        self.link = ParentChildLink.objects.create(parent=self.parent, child=self.child, status='pending')
        self.other_link = ParentChildLink.objects.create(
            parent=self.other_parent, child=self.other_child, status='pending'
        )
        self.invalid_link = ParentChildLink.objects.create(
            parent=self.parent, child=self.not_child, status='pending'
        )

    def test_pending_links_require_parent(self):
        resp = self.client.get(self.PENDING_URL)
        self.assertIn(resp.status_code, [401, 403])
        self.client.force_authenticate(user=self.child)
        resp = self.client.get(self.PENDING_URL)
        self.assertEqual(resp.status_code, 403)

    def test_parent_sees_only_own_pending_links(self):
        self.client.force_authenticate(user=self.parent)
        resp = self.client.get(self.PENDING_URL)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual({item['id'] for item in resp.data}, {self.link.id, self.invalid_link.id})
        for item in resp.data:
            self.assertNotIn('password', item)

    def test_parent_verify_own_link_approves_child(self):
        self.client.force_authenticate(user=self.parent)
        resp = self.client.post(
            f'/accounts/parent-links/{self.link.id}/verify/', {}, format='json'
        )
        self.assertEqual(resp.status_code, 200)
        link = ParentChildLink.objects.get(pk=self.link.pk)
        self.assertEqual(link.status, 'verified')
        profile = Profile.objects.get(user=self.child)
        self.assertEqual(profile.status, 'approved')
        user = User.objects.get(pk=self.child.pk)
        self.assertTrue(user.is_active)

    def test_parent_reject_own_link_keeps_child_pending(self):
        self.client.force_authenticate(user=self.parent)
        resp = self.client.post(
            f'/accounts/parent-links/{self.link.id}/reject/', {}, format='json'
        )
        self.assertEqual(resp.status_code, 200)
        link = ParentChildLink.objects.get(pk=self.link.pk)
        self.assertEqual(link.status, 'rejected')
        profile = Profile.objects.get(user=self.child)
        self.assertEqual(profile.status, 'pending')

    def test_other_parent_cannot_review_link(self):
        self.client.force_authenticate(user=self.other_parent)
        resp = self.client.post(
            f'/accounts/parent-links/{self.link.id}/verify/', {}, format='json'
        )
        self.assertEqual(resp.status_code, 404)
        link = ParentChildLink.objects.get(pk=self.link.pk)
        self.assertEqual(link.status, 'pending')
        profile = Profile.objects.get(user=self.child)
        self.assertEqual(profile.status, 'pending')

    def test_processed_link_cannot_be_reprocessed(self):
        self.client.force_authenticate(user=self.parent)
        first = self.client.post(
            f'/accounts/parent-links/{self.link.id}/verify/', {}, format='json'
        )
        self.assertEqual(first.status_code, 200)
        second = self.client.post(
            f'/accounts/parent-links/{self.link.id}/reject/', {}, format='json'
        )
        self.assertEqual(second.status_code, 400)
        link = ParentChildLink.objects.get(pk=self.link.pk)
        self.assertEqual(link.status, 'verified')

    def test_link_to_non_child_is_rejected(self):
        self.client.force_authenticate(user=self.parent)
        resp = self.client.post(
            f'/accounts/parent-links/{self.invalid_link.id}/verify/', {}, format='json'
        )
        self.assertEqual(resp.status_code, 400)
        link = ParentChildLink.objects.get(pk=self.invalid_link.pk)
        self.assertEqual(link.status, 'pending')

    def test_missing_link_returns_404(self):
        self.client.force_authenticate(user=self.parent)
        resp = self.client.post('/accounts/parent-links/999999/verify/', {}, format='json')
        self.assertEqual(resp.status_code, 404)


class ApprovalGateTests(APITestCase):
    PASSWORD = 'StrongPass123!'
    LOGIN_URL = '/accounts/login/'
    REFRESH_URL = '/accounts/token/refresh/'

    def make_user(self, email, role, approval_status, is_active=True, is_superuser=False):
        if is_superuser:
            user = User.objects.create_superuser(username=email, email=email, password=self.PASSWORD)
        else:
            user = User.objects.create_user(username=email, email=email, password=self.PASSWORD)
        user.is_active = is_active
        user.save()
        Profile.objects.create(
            user=user,
            role=role,
            normalized_email=email,
            status=approval_status,
        )
        return user

    def login(self, email):
        return self.client.post(
            self.LOGIN_URL,
            {'email': email, 'password': self.PASSWORD},
            format='json',
        )

    def test_approved_parent_and_admin_login(self):
        self.make_user('gate-parent@test.com', 'parent', 'approved')
        self.make_user('gate-admin@test.com', 'admin', 'approved', is_superuser=True)
        for email, expected_role in (
            ('gate-parent@test.com', 'parent'),
            ('gate-admin@test.com', 'admin'),
        ):
            resp = self.login(email)
            self.assertEqual(resp.status_code, 200)
            self.assertIn('access', resp.data)
            self.assertIn('refresh', resp.data)
            self.assertEqual(resp.data['user']['role'], expected_role)

    def test_pending_roles_cannot_login(self):
        for email, role in (
            ('gate-cons@test.com', 'consultant'),
            ('gate-school@test.com', 'school'),
            ('gate-child@test.com', 'child'),
        ):
            self.make_user(email, role, 'pending')
            resp = self.login(email)
            self.assertEqual(resp.status_code, 401)
            self.assertNotIn('access', resp.data)
            self.assertNotIn('refresh', resp.data)

    def test_rejected_account_cannot_login(self):
        self.make_user('gate-rejected@test.com', 'consultant', 'rejected')
        resp = self.login('gate-rejected@test.com')
        self.assertEqual(resp.status_code, 401)
        self.assertNotIn('access', resp.data)
        self.assertNotIn('refresh', resp.data)

    def test_inactive_approved_account_cannot_login(self):
        self.make_user('gate-inactive@test.com', 'parent', 'approved', is_active=False)
        resp = self.login('gate-inactive@test.com')
        self.assertEqual(resp.status_code, 401)
        self.assertNotIn('access', resp.data)
        self.assertNotIn('refresh', resp.data)

    def test_me_returns_status_without_sensitive_fields(self):
        self.make_user('gate-me@test.com', 'parent', 'approved')
        login_resp = self.login('gate-me@test.com')
        self.assertEqual(login_resp.status_code, 200)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {login_resp.data['access']}")
        me = self.client.get('/accounts/me/')
        self.assertEqual(me.status_code, 200)
        self.assertEqual(me.data['role'], 'parent')
        self.assertEqual(me.data['status'], 'approved')
        self.assertNotIn('password', me.data)
        self.assertNotIn('is_superuser', me.data)
        self.assertNotIn('is_staff', me.data)

    def test_bad_password_does_not_disclose_account_state(self):
        self.make_user('gate-secret@test.com', 'consultant', 'pending')
        resp = self.client.post(
            self.LOGIN_URL,
            {'email': 'gate-secret@test.com', 'password': 'WrongPass123!'},
            format='json',
        )
        self.assertEqual(resp.status_code, 401)
        self.assertEqual(resp.data['detail'], 'Invalid credentials.')

    def test_access_token_denied_after_status_change(self):
        user = self.make_user('gate-access@test.com', 'parent', 'approved')
        login_resp = self.login('gate-access@test.com')
        self.assertEqual(login_resp.status_code, 200)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {login_resp.data['access']}")
        self.assertEqual(self.client.get('/accounts/me/').status_code, 200)

        Profile.objects.filter(user=user).update(status='pending')
        denied = self.client.get('/accounts/me/')
        self.assertIn(denied.status_code, [401, 403])
        self.assertNotIn('email', denied.data)

    def test_access_token_denied_after_deactivation(self):
        user = self.make_user('gate-deactivate@test.com', 'parent', 'approved')
        login_resp = self.login('gate-deactivate@test.com')
        self.assertEqual(login_resp.status_code, 200)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {login_resp.data['access']}")

        User.objects.filter(pk=user.pk).update(is_active=False)
        denied = self.client.get('/accounts/me/')
        self.assertIn(denied.status_code, [401, 403])

    def test_refresh_denied_after_status_change(self):
        user = self.make_user('gate-refresh@test.com', 'consultant', 'approved')
        login_resp = self.login('gate-refresh@test.com')
        self.assertEqual(login_resp.status_code, 200)
        refresh = login_resp.data['refresh']

        Profile.objects.filter(user=user).update(status='rejected')
        resp = self.client.post(self.REFRESH_URL, {'refresh': refresh}, format='json')
        self.assertIn(resp.status_code, [400, 401])
        self.assertNotIn('access', resp.data)

    def test_refresh_denied_after_deactivation(self):
        user = self.make_user('gate-refresh-off@test.com', 'parent', 'approved')
        login_resp = self.login('gate-refresh-off@test.com')
        self.assertEqual(login_resp.status_code, 200)
        refresh = login_resp.data['refresh']

        User.objects.filter(pk=user.pk).update(is_active=False)
        resp = self.client.post(self.REFRESH_URL, {'refresh': refresh}, format='json')
        self.assertIn(resp.status_code, [400, 401])
        self.assertNotIn('access', resp.data)

    def test_refresh_rotation_and_blacklist_preserved(self):
        self.make_user('gate-rotate@test.com', 'parent', 'approved')
        login_resp = self.login('gate-rotate@test.com')
        self.assertEqual(login_resp.status_code, 200)
        first_refresh = login_resp.data['refresh']

        rotated = self.client.post(self.REFRESH_URL, {'refresh': first_refresh}, format='json')
        self.assertEqual(rotated.status_code, 200)
        self.assertIn('access', rotated.data)
        self.assertIn('refresh', rotated.data)

        reused = self.client.post(self.REFRESH_URL, {'refresh': first_refresh}, format='json')
        self.assertIn(reused.status_code, [400, 401])
        self.assertNotIn('access', reused.data)

    def test_logout_still_blacklists_refresh(self):
        self.make_user('gate-logout@test.com', 'parent', 'approved')
        login_resp = self.login('gate-logout@test.com')
        self.assertEqual(login_resp.status_code, 200)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {login_resp.data['access']}")
        logout_resp = self.client.post(
            '/accounts/logout/', {'refresh': login_resp.data['refresh']}, format='json'
        )
        self.assertEqual(logout_resp.status_code, 200)
        self.client.credentials()
        refresh_resp = self.client.post(
            self.REFRESH_URL, {'refresh': login_resp.data['refresh']}, format='json'
        )
        self.assertIn(refresh_resp.status_code, [400, 401])
        self.assertNotIn('access', refresh_resp.data)


