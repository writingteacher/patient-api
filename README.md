# Patient Management API

A RESTful API for managing patients, appointments, medical records, and prescriptions. Built with Node.js and Express, documented with OpenAPI 3.0 and Swagger UI.

**Live API:** https://patient-api-vzzr.onrender.com  
**Interactive docs:** https://patient-api-vzzr.onrender.com/api-docs

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Auth:** JWT (Bearer token)
- **Documentation:** OpenAPI 3.0, Swagger UI
- **Hosting:** Render

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Install and run
```bash
git clone https://github.com/writingteacher/patient-api.git
cd patient-api
npm install
node index.js
```

Server runs at `http://localhost:3000`  
Docs available at `http://localhost:3000/api-docs`

---

## Authentication

All endpoints except `POST /api/v1/auth/login` require a JWT Bearer token.

**Step 1 — Get a token:**
```bash
curl -X POST https://patient-api-vzzr.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}'
```

**Step 2 — Use the token:**
```bash
curl https://patient-api-vzzr.onrender.com/api/v1/patients \
  -H "Authorization: Bearer <your-token>"
```

**Demo credentials:**

| Username | Password | Role |
|----------|----------|------|
| admin | password123 | admin |

Tokens expire after 8 hours.

---

## Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/login | Get a JWT token |

### Patients
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/patients | List all patients |
| POST | /api/v1/patients | Create a patient |
| GET | /api/v1/patients/:id | Get a patient by ID |
| PATCH | /api/v1/patients/:id | Update a patient |
| DELETE | /api/v1/patients/:id | Delete a patient |

### Appointments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/appointments | List all appointments |
| POST | /api/v1/appointments | Schedule an appointment |
| GET | /api/v1/appointments/:id | Get an appointment by ID |
| PATCH | /api/v1/appointments/:id | Update an appointment |
| DELETE | /api/v1/appointments/:id | Delete an appointment |

### Medical Records
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/medical-records | List all medical records |
| POST | /api/v1/medical-records | Create a medical record |
| GET | /api/v1/medical-records/:id | Get a record by ID |
| PATCH | /api/v1/medical-records/:id | Update a record |
| DELETE | /api/v1/medical-records/:id | Delete a record |

### Prescriptions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/prescriptions | List all prescriptions |
| POST | /api/v1/prescriptions | Create a prescription |
| GET | /api/v1/prescriptions/:id | Get a prescription by ID |
| PATCH | /api/v1/prescriptions/:id | Update a prescription |
| DELETE | /api/v1/prescriptions/:id | Delete a prescription |

---

## Response Format

All responses use a consistent envelope:
```json
{
  "success": true,
  "data": {}
}
```

Errors always include a code:
```json
{
  "success": false,
  "error": {
    "code": "PATIENT_NOT_FOUND",
    "message": "Patient with ID 'pat-999' not found."
  }
}
```

---

## HIPAA Note

This is a demonstration API for portfolio purposes. A production healthcare API would require TLS enforcement, audit logging, role-based access control, and data encryption at rest.