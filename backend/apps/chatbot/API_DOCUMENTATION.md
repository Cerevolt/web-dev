# Cerevolt Chatbot API Documentation

## Authentication
All chatbot endpoints require authentication via JWT Bearer tokens. Include header:
```
Authorization: Bearer <access_token>
```

Unauthenticated requests return `401` or `403`.

## Models

### ChatSession
- `id` (int, PK)
- `user` (FK to auth.User) - owner of session, cascades on delete
- `title` (string, optional)
- `created_at` (datetime)
- `updated_at` (datetime)

### ChatMessage
- `id` (int, PK)
- `session` (FK to ChatSession) - cascades on delete
- `role` (enum: `user` | `assistant`)
- `content` (text)
- `created_at` (datetime)

Sessions and messages are ordered by recency/creation as defined in models.

## Endpoints

### 1. Create Session
`POST /chatbot/sessions/`

**Request:**
```json
{
  "title": "Optional session title"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "title": null,
  "created_at": "2026-01-01T00:00:00Z",
  "updated_at": "2026-01-01T00:00:00Z"
}
```

### 2. List Sessions
`GET /chatbot/sessions/`

Returns only sessions owned by the authenticated user.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": null,
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z"
  }
]
```

### 3. Send Message
`POST /chatbot/sessions/<id>/messages/`

Sends a message in the specified session, retrieves conversation history (limited), calls Gemini service, saves both user and assistant messages, and returns them.

**Request:**
```json
{
  "message": "Hello"
}
```

**Validation:**
- `message` is required, max length 4000 characters
- Empty/whitespace-only messages return `400`

**Response (200 OK):**
```json
{
  "session_id": 1,
  "user_message": {
    "id": 10,
    "content": "Hello",
    "created_at": "2026-01-01T00:00:01Z"
  },
  "assistant_message": {
    "id": 11,
    "content": "Hi there",
    "created_at": "2026-01-01T00:00:02Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Validation errors (empty/invalid message)
- `401/403` - Unauthenticated/unauthorized
- `404 Not Found` - Session not found or not owned by user
- `503 Service Unavailable` - Gemini not configured or service failure

## Gemini Configuration
Configuration via environment variables (no secrets committed):
- `GEMINI_API_KEY` - API key for Google Gemini (required for functionality)
- `GEMINI_MODEL_NAME` - Model name (default: `gemini-2.5-flash`)

Missing configuration is handled gracefully; endpoints return `503` without exposing secrets.

## Security
- **Session ownership:** Sessions are always associated with `request.user`. All queries filter by user; cross-user access returns `404`.
- **No ownership changes:** Session/user ownership cannot be changed via request data.
- **Role access:** Authenticated users of any role (admin, parent, consultant, school, child) can use general chatbot conversations.
- **Data isolation:** Chatbot APIs do not currently expose private data from Children, Parents, Consultant, or School apps. Only session/message data for the authenticated user is accessible.
- **Secret safety:** API keys and internal exception details are never exposed in responses or logs.

## Testing
- Tests use mocked Gemini responses (no real API calls made). 
- Security tests cover auth, cross-user access prevention, and error sanitization.
