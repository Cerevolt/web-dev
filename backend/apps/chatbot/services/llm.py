import logging

from django.conf import settings

logger = logging.getLogger(__name__)


class LLMServiceError(Exception):
    pass


class GeminiService:
    def __init__(self):
        self.api_key = getattr(settings, 'GEMINI_API_KEY', None)
        self.model_name = getattr(settings, 'GEMINI_MODEL_NAME', 'gemini-2.5-flash')
        self._client = None

    def _get_client(self):
        if self._client is not None:
            return self._client
        if not self.api_key:
            raise LLMServiceError('LLM not configured')
        try:
            genai = None
            try:
                import google.genai as genai_module
                genai = genai_module
            except Exception:
                try:
                    from google import genai as genai_module
                    genai = genai_module
                except Exception:
                    pass

            if genai is None:
                raise LLMServiceError('LLM initialization failed')

            try:
                self._client = genai.Client(api_key=self.api_key)
            except Exception:
                raise LLMServiceError('LLM initialization failed')
            return self._client
        except LLMServiceError:
            raise
        except Exception:
            raise LLMServiceError('LLM initialization failed')

    def generate_response(self, message, history=None, timeout=30):
        if not message or not isinstance(message, str) or not message.strip():
            return {
                'success': False,
                'content': None,
                'error': 'Empty message',
            }

        history = history or []
        try:
            client = self._get_client()
            contents = []
            for h in history:
                if not isinstance(h, dict):
                    continue
                role = h.get('role')
                content = h.get('content')
                if not content:
                    continue
                if role == 'assistant':
                    contents.append({'role': 'model', 'parts': [{'text': content}]})
                else:
                    contents.append({'role': 'user', 'parts': [{'text': content}]})
            contents.append({'role': 'user', 'parts': [{'text': message}]})

            try:
                response = client.models.generate_content(
                    model=self.model_name,
                    contents=contents,
                )
            except Exception:
                return {
                    'success': False,
                    'content': None,
                    'error': 'Generation failed',
                }

            text = None
            try:
                if hasattr(response, 'text') and response.text:
                    text = response.text
                elif hasattr(response, 'candidates') and response.candidates:
                    candidate = response.candidates[0]
                    if hasattr(candidate, 'content'):
                        content = candidate.content
                        if hasattr(content, 'parts') and content.parts:
                            part = content.parts[0]
                            if hasattr(part, 'text'):
                                text = part.text
            except Exception:
                text = None

            if not text:
                return {
                    'success': False,
                    'content': None,
                    'error': 'Empty response',
                }

            return {
                'success': True,
                'content': text,
                'error': None,
            }
        except LLMServiceError as e:
            return {
                'success': False,
                'content': None,
                'error': str(e),
            }
        except Exception:
            return {
                'success': False,
                'content': None,
                'error': 'Service error',
            }


_default_service = GeminiService()


def generate_chat_response(message, history=None, timeout=30):
    return _default_service.generate_response(message, history=history, timeout=timeout)
