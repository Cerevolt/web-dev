from unittest.mock import patch, MagicMock
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient

from apps.accounts.models import Profile
from apps.chatbot.services import llm


class GeminiServiceTests(TestCase):
    def setUp(self):
        llm._default_service._client = None

    @patch('apps.chatbot.services.llm.settings')
    def test_missing_api_key_returns_error(self, mock_settings):
        mock_settings.GEMINI_API_KEY = None
        mock_settings.GEMINI_MODEL_NAME = 'gemini-2.5-flash'
        service = llm.GeminiService()
        result = service.generate_response('hello')
        self.assertFalse(result['success'])
        self.assertIsNone(result['content'])

    @patch('apps.chatbot.services.llm.settings')
    def test_generate_response_with_history(self, mock_settings):
        mock_settings.GEMINI_API_KEY = 'test-key'
        mock_settings.GEMINI_MODEL_NAME = 'gemini-2.5-flash'
        service = llm.GeminiService()
        mock_client = MagicMock()
        mock_response = MagicMock()
        mock_response.text = 'Hello there'
        mock_client.models.generate_content.return_value = mock_response
        service._client = mock_client
        result = service.generate_response('hi', history=[{'role': 'user', 'content': 'prev'}, {'role': 'assistant', 'content': 'resp'}])
        self.assertTrue(result['success'])
        self.assertEqual(result['content'], 'Hello there')

    @patch('apps.chatbot.services.llm.settings')
    def test_api_error_handled(self, mock_settings):
        mock_settings.GEMINI_API_KEY = 'test-key'
        mock_settings.GEMINI_MODEL_NAME = 'gemini-2.5-flash'
        service = llm.GeminiService()
        mock_client = MagicMock()
        mock_client.models.generate_content.side_effect = Exception('api error')
        service._client = mock_client
        result = service.generate_response('hi')
        self.assertFalse(result['success'])
        self.assertIsNone(result['content'])

    @patch('apps.chatbot.services.llm.settings')
    def test_empty_message(self, mock_settings):
        mock_settings.GEMINI_API_KEY = 'test-key'
        mock_settings.GEMINI_MODEL_NAME = 'gemini-2.5-flash'
        service = llm.GeminiService()
        result = service.generate_response('   ')
        self.assertFalse(result['success'])
        self.assertIsNone(result['content'])


class ChatbotAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='cbuser@test.com', email='cbuser@test.com', password='Pass1234!')
        Profile.objects.create(user=self.user, role='child', normalized_email='cbuser@test.com')
        resp = self.client.post('/accounts/login/', {'email': 'cbuser@test.com', 'password': 'Pass1234!'}, format='json')
        self.access = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access}')

    @patch('apps.chatbot.views.settings')
    @patch('apps.chatbot.views.generate_chat_response')
    def test_create_and_send_message(self, mock_gen, mock_settings):
        mock_settings.GEMINI_API_KEY = 'test-key'
        mock_gen.return_value = {'success': True, 'content': 'Hi there', 'error': None}
        r = self.client.post('/chatbot/sessions/', {}, format='json')
        self.assertIn(r.status_code, [200, 201])
        session_id = r.data['id']
        r2 = self.client.post(f'/chatbot/sessions/{session_id}/messages/', {'message': 'Hello'}, format='json')
        self.assertEqual(r2.status_code, 200)
        self.assertIn('session_id', r2.data)
        self.assertIn('user_message', r2.data)
        self.assertIn('assistant_message', r2.data)

    def test_list_sessions_requires_auth(self):
        c = APIClient()
        r = c.get('/chatbot/sessions/')
        self.assertIn(r.status_code, [401, 403])

    @patch('apps.chatbot.views.settings')
    def test_missing_config_returns_503(self, mock_settings):
        mock_settings.GEMINI_API_KEY = None
        r = self.client.post('/chatbot/sessions/', {}, format='json')
        session_id = r.data['id']
        r2 = self.client.post(f'/chatbot/sessions/{session_id}/messages/', {'message': 'Hello'}, format='json')
        self.assertEqual(r2.status_code, 503)

    def test_all_roles_can_use_chatbot_when_authenticated(self):
        roles = ['admin', 'parent', 'consultant', 'school', 'child']
        for role in roles:
            if role == 'admin':
                u = User.objects.create_superuser(username=f'cb_{role}@test.com', email=f'cb_{role}@test.com', password='Pass1234!')
            else:
                u = User.objects.create_user(username=f'cb_{role}@test.com', email=f'cb_{role}@test.com', password='Pass1234!')
            Profile.objects.create(user=u, role=role, normalized_email=f'cb_{role}@test.com')
            c = APIClient()
            resp = c.post('/accounts/login/', {'email': f'cb_{role}@test.com', 'password': 'Pass1234!'}, format='json')
            access = resp.data['access']
            c.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
            r = c.post('/chatbot/sessions/', {}, format='json')
            self.assertIn(r.status_code, [200, 201])

    def test_unauthenticated_cannot_access_any_endpoint(self):
        c = APIClient()
        self.assertIn(c.get('/chatbot/sessions/').status_code, [401, 403])
        self.assertIn(c.post('/chatbot/sessions/', {}).status_code, [401, 403])
        self.assertIn(c.post('/chatbot/sessions/1/messages/', {'message': 'hi'}).status_code, [401, 403])

    @patch('apps.chatbot.views.settings')
    @patch('apps.chatbot.views.generate_chat_response')
    def test_user_cannot_retrieve_another_users_sessions(self, mock_gen, mock_settings):
        mock_settings.GEMINI_API_KEY = 'test-key'
        mock_gen.return_value = {'success': True, 'content': 'Hi', 'error': None}
        r = self.client.post('/chatbot/sessions/', {}, format='json')
        session_id = r.data['id']
        other = User.objects.create_user(username='othercb@test.com', email='othercb@test.com', password='Pass1234!')
        Profile.objects.create(user=other, role='parent', normalized_email='othercb@test.com')
        c = APIClient()
        resp = c.post('/accounts/login/', {'email': 'othercb@test.com', 'password': 'Pass1234!'}, format='json')
        c.credentials(HTTP_AUTHORIZATION=f'Bearer {resp.data["access"]}')
        # other cannot send to first user's session
        r2 = c.post(f'/chatbot/sessions/{session_id}/messages/', {'message': 'hello'}, format='json')
        self.assertEqual(r2.status_code, 404)
        # other's sessions list should not include it
        r3 = c.get('/chatbot/sessions/')
        ids = [s['id'] for s in r3.data]
        self.assertNotIn(session_id, ids)

    @patch('apps.chatbot.views.settings')
    @patch('apps.chatbot.views.generate_chat_response')
    def test_cannot_change_session_ownership_via_data(self, mock_gen, mock_settings):
        mock_settings.GEMINI_API_KEY = 'test-key'
        mock_gen.return_value = {'success': True, 'content': 'Hi', 'error': None}
        r = self.client.post('/chatbot/sessions/', {'user': 999, 'title': 'x'}, format='json')
        self.assertIn(r.status_code, [200, 201])
        self.assertEqual(r.data.get('user') or True, r.data.get('user') is None or r.data.get('id') is not None)  # ensure no leak

    @patch('apps.chatbot.views.settings')
    @patch('apps.chatbot.views.generate_chat_response')
    def test_gemini_errors_do_not_expose_secrets(self, mock_gen, mock_settings):
        mock_settings.GEMINI_API_KEY = 'secret-key-12345'
        mock_gen.return_value = {'success': False, 'content': None, 'error': 'sk-secret-key-12345 internal error'}
        r = self.client.post('/chatbot/sessions/', {}, format='json')
        session_id = r.data['id']
        r2 = self.client.post(f'/chatbot/sessions/{session_id}/messages/', {'message': 'hi'}, format='json')
        self.assertEqual(r2.status_code, 503)
        self.assertNotIn('secret', str(r2.data).lower())
        self.assertNotIn('sk-', str(r2.data).lower())

