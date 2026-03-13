# Getting Started

This guide walks you through making your first API request in under five minutes.

---

## Base URL
```
https://patient-api-vzzr.onrender.com
```

---

## Step 1 — Get a Token

All API endpoints except login require a JWT Bearer token. Start by logging in with the demo credentials.

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

Copy the `token` value. You will need it for every request.

---

## Step 2 — List Patients

Use your token to fetch the list of patients:
```bash
curl https://patient-api-vzzr.onrender.com/api/v1/patients \
  -H "Authorization: Bearer <your-token>"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "pat-001",
      "firstName": "Robert",
      "lastName": "Johnson",
      "dateOfBirth": "1978-04-12",
      "gender": "male",
      "email": "r.johnson@email.com",
      "phone": "555-0101"
    }
  ]
}
```

---

## Step 3 — Create a Patient
```bash
curl -X POST https://patient-api-vzzr.onrender.com/api/v1/patients \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Maria",
    "lastName": "Santos",
    "dateOfBirth": "1985-07-22",
    "gender": "female",
    "email": "m.santos@email.com",
    "phone": "555-0404"
  }'
```

---

## Step 4 — Schedule an Appointment

Use the patient ID returned in Step 3:
```bash
curl -X POST https://patient-api-vzzr.onrender.com/api/v1/appointments \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": "pat-001",
    "physicianName": "Dr. Jane Smith",
    "department": "Cardiology",
    "appointmentDate": "2025-05-10",
    "appointmentTime": "11:00",
    "reason": "Follow-up consultation"
  }'
```

---

## Step 5 — Explore the Interactive Docs

The full API is available in Swagger UI where you can read documentation and test every endpoint in your browser:

→ [https://patient-api-vzzr.onrender.com/api-docs](https://patient-api-vzzr.onrender.com/api-docs)

---

## Using Postman

Prefer a GUI? Import the Postman collection included in this repository:

1. Open Postman
2. Click **Import**
3. Select `patient-api.postman_collection.json` from this repo
4. All requests are pre-configured and ready to run

---

## Next Steps

- [Authentication](docs/authentication.md) — token expiry and security notes
- [Error Handling](docs/errors.md) — full list of error codes
- [Architecture](docs/architecture.md) — data model and clinical workflows