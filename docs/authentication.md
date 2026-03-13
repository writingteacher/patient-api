# Authentication

The Patient Management API uses **JWT (JSON Web Token)** Bearer token authentication. All endpoints except `POST /api/v1/auth/login` require a valid token.

---

## How It Works

1. You send your credentials to the login endpoint
2. The API returns a signed JWT
3. You include that token in the `Authorization` header of every subsequent request

---

## Getting a Token

**Request:**
```bash
curl -X POST https://patient-api-vzzr.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 28800
  }
}
```

---

## Using a Token

Include the token in the `Authorization` header using the `Bearer` scheme:
```
Authorization: Bearer <your-token>
```

**Example:**
```bash
curl https://patient-api-vzzr.onrender.com/api/v1/patients \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Token Expiry

Tokens expire after **8 hours** (`expiresIn: 28800` seconds). After expiry, requests return:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired token."
  }
}
```

When this happens, log in again to get a new token.

---

## Demo Credentials

| Username | Password | Role |
|----------|----------|------|
| `admin` | `password123` | admin |

---

## Security Notes

- Tokens are signed with a secret key using the HS256 algorithm
- Tokens are not encrypted — do not store sensitive data in them
- In production, always use HTTPS to prevent token interception
- The `JWT_SECRET` environment variable must be changed from the default in any production deployment