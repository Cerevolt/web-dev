# Cerevolt Backend API Documentation

**Version:** 1.0  
**Base URL:** `http://localhost:8000` (development)  
**Framework:** Django 5.x + Django REST Framework + SimpleJWT  
**Authentication:** JWT Bearer tokens (Access + Refresh)

---

## Table of Contents

- [Overview](#overview)
- [Authentication & Authorization](#authentication--authorization)
- [User Roles & Permissions](#user-roles--permissions)
- [Endpoints](#endpoints)
  - [Accounts API](#accounts-api)
  - [Children API](#children-api)
  - [Consultant API](#consultant-api)
  - [Parents API](#parents-api)
- [Error Responses](#error-responses)
- [Security Considerations](#security-considerations)
- [Missing APIs for React Integration](#missing-apis-for-react-integration)
- [Testing Status](#testing-status)

---

## Overview

This document describes the actual implemented API endpoints in the Cerevolt Django backend. All endpoints have been inspected from source code and tested. No endpoints have been invented.

---

## Authentication & Authorization

### Authentication Flow

1. **Login**: POST to `/accounts/login/` with email and password → Receive `access` token (15 min), `refresh` token (7 days), and user info
2. **Authenticated Requests**: Include header `Authorization: Bearer <access_token>`
3. **Logout**: POST to `/accounts/logout/` with refresh token → Blacklists the refresh token
4. **Current User**: GET `/accounts/me/` to retrieve authenticated user's details

### JWT Configuration (Actual)
```python
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,
    'ALGORITHM': 'HS256',
    'AUTH_HEADER_TYPES': ('Bearer',),
}
```

### Required Headers
| Header | Required | Value | Notes |
|--------|----------|-------|-------|
| `Authorization` | For protected endpoints | `Bearer <access_token>` | JWT access token |
| `Content-Type` | For POST/PUT/PATCH | `application/json` | JSON request body |

---

## User Roles & Permissions

### Available Roles (from Profile model)
- `admin` - Administrator
- `parent` - Parent/Guardian
- `consultant` - Consultant/Doctor
- `school` - School/Teacher
- `child` - Child

### Permission Rules

| Permission Class | Rules | Notes |
|------------------|-------|-------|
| `IsAdmin` | Requires authenticated user + `is_superuser=True` + valid Profile + `role == 'admin'` | Admin creation blocked for non-superusers. Admin role cannot be created via API. |
| `IsAuthenticated` | Django REST Framework's default authenticated check | Used for logout and me endpoints |
| `AllowAny` | No authentication required | Default permission class, used by login and all resource endpoints (children/parents/consultant) |

### Verified Permissions
- ✅ Only superusers can hold admin privileges (enforced by `IsAdmin`)
- ✅ Admin privileges cannot be obtained by changing profile role alone
- ✅ Non-admin users receive 403 when attempting admin-only actions
- ✅ Unauthenticated users receive 401 for protected endpoints
- ✅ Users cannot blacklist another user's refresh token (ownership validated)

---

## Endpoints

### Accounts API

#### 1. Login
**Status:** ✅ Implemented, Tested  
**Method:** `POST`  
**URL:** `/accounts/login/`  
**Auth Required:** No  
**Permission:** AllowAny  

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Validation:**
- Email and password required (400 if missing)
- Email lookup is case-insensitive (via `normalized_email` or `email__iexact`)
- Password checked with Django's password hasher
- Inactive users rejected (401)
- Users with admin role must be superusers (401 otherwise)
- Users must have a Profile (401 if missing)

**Success Response (200 OK):**
```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "parent"
  }
}
```

**Error Responses:**
- `400 Bad Request`: `{"detail": "Email and password are required."}`
- `401 Unauthorized`: `{"detail": "Invalid credentials."}` or `{"detail": "User account is inactive."}` or `{"detail": "User profile not found."}`

---

#### 2. Logout
**Status:** ✅ Implemented, Tested  
**Method:** `POST`  
**URL:** `/accounts/logout/`  
**Auth Required:** Yes (Bearer token)  
**Permission:** IsAuthenticated  

**Request Body:**
```json
{
  "refresh": "<refresh_token>"
}
```

**Behavior:**
- Validates refresh token
- Checks token ownership (token's `user_id` must match authenticated user) - returns 403 if mismatch
- Blacklists token using `rest_framework_simplejwt.token_blacklist`
- Handles already blacklisted/invalid tokens safely

**Success Response (200 OK):**
```json
{
  "detail": "Successfully logged out."
}
```

**Error Responses:**
- `400 Bad Request`: `{"detail": "Refresh token is required."}` or `{"detail": "Invalid or already blacklisted token."}`
- `403 Forbidden`: `{"detail": "Token does not belong to this user."}`
- `401 Unauthorized`: Missing/invalid access token

---

#### 3. Get Current User
**Status:** ✅ Implemented, Tested  
**Method:** `GET`  
**URL:** `/accounts/me/`  
**Auth Required:** Yes (Bearer token)  
**Permission:** IsAuthenticated  

**Request Body:** None  

**Success Response (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "parent"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing/invalid access token
- `404 Not Found`: `{"detail": "User profile not found."}`

---

#### 4. Create User (Admin Only)
**Status:** ✅ Implemented, Tested  
**Method:** `POST`  
**URL:** `/accounts/users/`  
**Auth Required:** Yes (Bearer token)  
**Permission:** IsAuthenticated + IsAdmin  

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "Pass1234!",
  "role": "parent",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Validation:**
- `email`: Required, valid email format. Normalized to lowercase. Must be unique across User.email and Profile.normalized_email (case-insensitive)
- `password`: Required, validated by Django password validators (UserAttributeSimilarityValidator, MinimumLengthValidator, CommonPasswordValidator, NumericPasswordValidator)
- `role`: Required, must be one of `parent`, `consultant`, `school`, `child` (admin cannot be created via API)
- `first_name`: Optional, can be blank
- `last_name`: Optional, can be blank

**Success Response (201 Created):**
```json
{
  "id": 15,
  "email": "newuser@example.com",
  "role": "parent",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors (duplicate email, invalid email, weak password, admin role not allowed)
- `401 Unauthorized`: Missing/invalid access token
- `403 Forbidden`: Non-admin user attempting creation

---

### Children API

**Status:** ✅ Implemented, Tested (all return 200)  
**Authentication:** **None required** (AllowAny)  
**Permission:** Default DRF permission (AllowAny per settings)  
**Note:** ⚠️ **NOT SECURED** - Publicly accessible

| Method | URL | View | Description | Auth |
|--------|-----|------|-------------|------|
| GET | `/children/videos/` | `video_list` | List all videos | None |
| GET | `/children/games/` | `game_list` | List all games | None |
| GET | `/children/rewards/` | `reward_list` | List all rewards | None |
| GET | `/children/dailygoals/` | `dailygoal_list` | List all daily goals | None |

**Request:** No body, no authentication required  
**Response:** Array of serialized objects (200 OK)  
**Models:** Video, Game, Reward, DailyGoal (see serializers for fields)

---

### Consultant API

**Status:** ✅ Implemented, Tested (all return 200)  
**Authentication:** **None required** (AllowAny)  
**Permission:** Default DRF permission (AllowAny)  
**Note:** ⚠️ **NOT SECURED** - Publicly accessible

| Method | URL | View | Description | Auth |
|--------|-----|------|-------------|------|
| GET | `/consultant/assessments/` | `assessment_list` | List all assessments | None |
| GET | `/consultant/progress/` | `progress_list` | List all progress data | None |

**Request:** No body, no authentication required  
**Response:** Array of serialized objects (200 OK)  
**Models:** Assessment, ProgressData

---

### Parents API

**Status:** ✅ Implemented, Tested (all return 200)  
**Authentication:** **None required** (AllowAny)  
**Permission:** Default DRF permission (AllowAny)  
**Note:** ⚠️ **NOT SECURED** - Publicly accessible

| Method | URL | View | Description | Auth |
|--------|-----|------|-------------|------|
| GET | `/parents/feedbacks/` | `feedback_list` | List all feedbacks | None |
| GET | `/parents/doctor-requests/` | `doctor_request_list` | List all doctor support requests | None |

**Request:** No body, no authentication required  
**Response:** Array of serialized objects (200 OK)  
**Models:** Feedback, DoctorSupportRequest

---

## Error Responses

| Status Code | Meaning | Common Cases |
|-------------|---------|--------------|
| 400 Bad Request | Validation error | Missing fields, invalid email, weak password, duplicate email, admin creation attempt, invalid/missing refresh token |
| 401 Unauthorized | Authentication required/failed | Invalid credentials, missing/invalid access token, inactive user, user without profile, admin role without superuser |
| 403 Forbidden | Permission denied | Non-admin trying to create user, token doesn't belong to user |
| 404 Not Found | Resource not found | User profile missing for authenticated user |
| 500 Internal Server Error | Server error | Unhandled exceptions (some caught and converted to 400) |

---

## Security Considerations

### Implemented Security Features
- ✅ JWT authentication with short-lived access tokens (15 min)
- ✅ Refresh token rotation enabled
- ✅ Refresh token blacklisting on logout
- ✅ Token ownership validation on logout
- ✅ Case-insensitive email normalization and uniqueness
- ✅ Admin privileges require superuser status
- ✅ Password validation via Django validators
- ✅ Transaction safety on user creation
- ✅ Inactive user check
- ✅ Profile requirement enforcement

### Security Concerns (Current State)
- ⚠️ **Children, Parents, Consultant endpoints are PUBLIC** - No authentication required. Anyone can access all data. This is not secure for production.
- ⚠️ **No token refresh endpoint** - Clients cannot refresh expired access tokens via API
- ⚠️ **No CORS configuration visible** - May block React frontend requests from different origins
- ⚠️ **Default permission is AllowAny** - Applies to all endpoints unless explicitly overridden

---

## Missing APIs for React Integration

### Critical Missing (Blocking Common Flows)
| Missing API | Priority | Reason | Suggested Implementation |
|-------------|----------|--------|---------------------------|
| `POST /accounts/token/refresh/` or `POST /accounts/refresh/` | **HIGH** | Access tokens expire every 15 min. React needs to refresh without re-login. | Use `rest_framework_simplejwt.views.TokenRefreshView` |
| CORS headers configuration | **HIGH** | React frontend on different port/domain will be blocked by browser CORS policy | Add `django-cors-headers` and configure `CORS_ALLOWED_ORIGINS` |

### Recommended Missing (For Full Functionality)
| Missing API | Priority | Reason | Notes |
|-------------|----------|--------|-------|
| Token verify endpoint | Medium | Validate token without making authenticated request | `rest_framework_simplejwt.views.TokenVerifyView` |
| Password change endpoint | Medium | Users need to change passwords | Custom endpoint needed |
| Password reset/forgot password | Medium | Self-service password recovery | Requires email configuration |
| CRUD endpoints for Children/Parents/Consultant | Medium-High | Only GET lists exist; React likely needs create/update/delete | Need to add based on business requirements |
| Detail/retrieve endpoints (by ID) | Medium | Cannot fetch single resource | Add `/<id>/` routes |
| Filtering, pagination, search | Medium | Large datasets need efficient loading | Use DRF pagination/filtering |
| User profile update | Low | Update first_name, last_name, etc. | Custom endpoint needed |

---

## Testing Status

### Automated Tests
- **Accounts tests:** `apps.accounts.tests` - **17/17 PASSED** ✅
  - AccountsAuthTests: 10/10 PASSED
  - AdminPermissionTests: 7/7 PASSED (including duplicate email, logout blacklist)

### Manual API Tests (All Passed)
- ✅ Admin login, Parent login, Invalid login
- ✅ Access token authentication
- ✅ Logout with token blacklisting
- ✅ Current user endpoint
- ✅ Admin-only user creation
- ✅ All Children APIs (4 endpoints)
- ✅ All Consultant APIs (2 endpoints)
- ✅ All Parents APIs (2 endpoints)
- ✅ Unauthorized requests return 401
- ✅ Forbidden requests return 403

### Untested
- ⚠️ Token refresh flow (endpoint doesn't exist)
- ⚠️ Edge cases with expired tokens
- ⚠️ Concurrent token usage
- ⚠️ CORS preflight requests

---

## Documentation Files

**Created/Updated:**
- `API_DOCUMENTATION.md` - This file (created at `C:\Users\Tanusree Sadhukhan\OneDrive\Desktop\cerevolt\web-dev\API_DOCUMENTATION.md`)
- `Cerevolt_API_Collection.postman_collection.json` - Postman collection (exists at `C:\Users\Tanusree Sadhukhan\OneDrive\Desktop\cerevolt\web-dev\Cerevolt_API_Collection.postman_collection.json`, updated with accurate endpoints)

**No files modified** in terms of code/permissions/API behavior. Only documentation and Postman collection created/verified.

---

**Last Updated:** Based on actual code inspection and testing  
**Note:** This documentation reflects the current state of the codebase. All information has been verified against source files and tested via API calls.
