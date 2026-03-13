# Auth Endpoints

Base URL: `https://patient-api-vzzr.onrender.com/api/v1`

---

## POST /auth/login

Authenticates a user and returns a signed JWT Bearer token.

**Authentication required:** No

---

### Request

**Headers:**

| Header | Value |
|--------|-------|
| `Content-Type` | `application/json` |

**Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `username` | string | Yes | The user's username |
| `password` | string | Yes | The user's password |

**Example:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

---

### Responses

#### 200 — Success
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 28800
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `token` | string | JWT Bearer token to use in subsequent requests |
| `expiresIn` | integer | Seconds until the token expires (8 hours) |

#### 400 — Missing credentials
```json
{
  "success": false,
  "error": {
    "code": "MISSING_CREDENTIALS",
    "message": "Username and password are required."
  }
}
```

#### 401 — Invalid credentials
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid username or password."
  }
}
```

---

### Usage

After a successful login, include the token in the `Authorization` header of all subsequent requests:
```
Authorization: Bearer <your-token>
```

Tokens expire after 8 hours. When a token expires, call this endpoint again to get a new one.

See [Authentication](../authentication.md) for full details.