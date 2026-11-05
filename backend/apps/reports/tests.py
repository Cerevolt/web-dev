from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from apps.accounts.models import Profile
from apps.school.models import School, Class, StudentEnrollment


class AdminOverviewReportTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser(username='adminr@test.com', email='adminr@test.com', password='Pass1234!')
        Profile.objects.create(user=self.admin, role='admin', normalized_email='adminr@test.com')
        
        self.parent = User.objects.create_user(username='parentr@test.com', email='parentr@test.com', password='Pass1234!')
        Profile.objects.create(user=self.parent, role='parent', normalized_email='parentr@test.com')
        
        self.school = User.objects.create_user(username='schoolr@test.com', email='schoolr@test.com', password='Pass1234!')
        Profile.objects.create(user=self.school, role='school', normalized_email='schoolr@test.com')
        
        self.consultant = User.objects.create_user(username='conr@test.com', email='conr@test.com', password='Pass1234!')
        Profile.objects.create(user=self.consultant, role='consultant', normalized_email='conr@test.com')
        
        self.child = User.objects.create_user(username='childr@test.com', email='childr@test.com', password='Pass1234!')
        Profile.objects.create(user=self.child, role='child', normalized_email='childr@test.com')

    def test_admin_gets_200(self):
        resp = self.client.post('/accounts/login/', {'email': 'adminr@test.com', 'password': 'Pass1234!'}, format='json')
        self.assertEqual(resp.status_code, 200)
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.get('/reports/admin/overview/')
        self.assertEqual(r.status_code, 200)

    def test_parent_gets_403(self):
        resp = self.client.post('/accounts/login/', {'email': 'parentr@test.com', 'password': 'Pass1234!'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.get('/reports/admin/overview/')
        self.assertEqual(r.status_code, 403)

    def test_school_gets_403(self):
        resp = self.client.post('/accounts/login/', {'email': 'schoolr@test.com', 'password': 'Pass1234!'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.get('/reports/admin/overview/')
        self.assertEqual(r.status_code, 403)

    def test_consultant_gets_403(self):
        resp = self.client.post('/accounts/login/', {'email': 'conr@test.com', 'password': 'Pass1234!'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.get('/reports/admin/overview/')
        self.assertEqual(r.status_code, 403)

    def test_child_gets_403(self):
        resp = self.client.post('/accounts/login/', {'email': 'childr@test.com', 'password': 'Pass1234!'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.get('/reports/admin/overview/')
        self.assertEqual(r.status_code, 403)

    def test_unauthenticated_gets_401(self):
        r = self.client.get('/reports/admin/overview/')
        self.assertIn(r.status_code, [401, 403])

    def test_response_structure(self):
        resp = self.client.post('/accounts/login/', {'email': 'adminr@test.com', 'password': 'Pass1234!'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.get('/reports/admin/overview/')
        self.assertEqual(r.status_code, 200)
        self.assertIn('users', r.data)
        self.assertIn('schools', r.data)
        self.assertIn('enrollments', r.data)
        self.assertIn('content', r.data)
        self.assertIsInstance(r.data['users']['total'], int)

    def test_empty_tables_zero_counts(self):
        resp = self.client.post('/accounts/login/', {'email': 'adminr@test.com', 'password': 'Pass1234!'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.get('/reports/admin/overview/')
        self.assertEqual(r.status_code, 200)
        self.assertGreaterEqual(r.data['users']['total'], 0)
        self.assertGreaterEqual(r.data['content']['children']['videos'], 0)


class SchoolSummaryReportTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser(username='sadmin@test.com', email='sadmin@test.com', password='Pass1234!')
        Profile.objects.create(user=self.admin, role='admin', normalized_email='sadmin@test.com')

        self.school_owner = User.objects.create_user(username='sowner@test.com', email='sowner@test.com', password='Pass1234!')
        Profile.objects.create(user=self.school_owner, role='school', normalized_email='sowner@test.com')
        self.school = School.objects.create(owner=self.school_owner, name='School A')

        self.school_owner2 = User.objects.create_user(username='sowner2@test.com', email='sowner2@test.com', password='Pass1234!')
        Profile.objects.create(user=self.school_owner2, role='school', normalized_email='sowner2@test.com')
        self.school2 = School.objects.create(owner=self.school_owner2, name='School B')

        self.parent = User.objects.create_user(username='sparent@test.com', email='sparent@test.com', password='Pass1234!')
        Profile.objects.create(user=self.parent, role='parent', normalized_email='sparent@test.com')

        self.consultant = User.objects.create_user(username='scons@test.com', email='scons@test.com', password='Pass1234!')
        Profile.objects.create(user=self.consultant, role='consultant', normalized_email='scons@test.com')

        self.child = User.objects.create_user(username='schild@test.com', email='schild@test.com', password='Pass1234!')
        Profile.objects.create(user=self.child, role='child', normalized_email='schild@test.com')

    def test_admin_can_view_system_wide_summary(self):
        resp = self.client.post('/accounts/login/', {'email': 'sadmin@test.com', 'password': 'Pass1234!'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.get('/reports/school/summary/')
        self.assertEqual(r.status_code, 200)
        self.assertIn('total_schools', r.data)
        self.assertIn('class_wise_enrollments', r.data)

    def test_school_user_can_view_own_school_only(self):
        resp = self.client.post('/accounts/login/', {'email': 'sowner@test.com', 'password': 'Pass1234!'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.get('/reports/school/summary/')
        self.assertEqual(r.status_code, 200)
        self.assertIn('school', r.data)
        self.assertEqual(r.data['school']['id'], self.school.id)

    def test_school_user_cannot_access_another_school(self):
        resp = self.client.post('/accounts/login/', {'email': 'sowner@test.com', 'password': 'Pass1234!'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.get('/reports/school/summary/?school_id=' + str(self.school2.id))
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.data['school']['id'], self.school.id)

    def test_parent_gets_403(self):
        resp = self.client.post('/accounts/login/', {'email': 'sparent@test.com', 'password': 'Pass1234!'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.get('/reports/school/summary/')
        self.assertEqual(r.status_code, 403)

    def test_consultant_gets_403(self):
        resp = self.client.post('/accounts/login/', {'email': 'scons@test.com', 'password': 'Pass1234!'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.get('/reports/school/summary/')
        self.assertEqual(r.status_code, 403)

    def test_child_gets_403(self):
        resp = self.client.post('/accounts/login/', {'email': 'schild@test.com', 'password': 'Pass1234!'}, format='json')
        access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        r = self.client.get('/reports/school/summary/')
        self.assertEqual(r.status_code, 403)
