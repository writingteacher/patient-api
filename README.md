# Patient Management API

A RESTful API for managing patients, appointments, medical records, and prescriptions in a clinical setting. Built as a technical writing portfolio sample to demonstrate API documentation, endpoint design, and developer experience writing.

> **Live API:** `https://patient-api-vzzr.onrender.com`
>
> **Interactive Docs:** `https://patient-api-vzzr.onrender.com/api-docs`
>
> **Demo credentials:** username `admin` · password `password123`

---

## Quick Start

New to the API? Start here:

→ [Getting Started Guide](docs/getting-started.md)

Already familiar with REST APIs? Import the Postman collection and start testing immediately:

→ [Download Postman Collection](patient-api.postman_collection.json)

---

## Documentation

| Section | Description |
|---------|-------------|
| [Authentication](docs/authentication.md) | JWT tokens, login flow, token expiry |
| [Error Handling](docs/errors.md) | Error codes, response structure, validation errors |
| [Versioning](docs/versioning.md) | URL versioning and breaking change policy |
| [Architecture](docs/architecture.md) | Data model, resource relationships, and workflows |
| [Glossary](docs/glossary.md) | Healthcare and API terminology |
| [HIPAA Note](docs/hipaa-note.md) | Compliance considerations for production deployments |

---

## API Endpoints

| Resource | Endpoints |
|----------|-----------|
| [Auth](docs/endpoints/auth.md) | `POST /api/v1/auth/login` |
| [Patients](docs/endpoints/patients.md) | `GET` · `POST` · `GET /:id` · `PATCH /:id` · `DELETE /:id` |
| [Appointments](docs/endpoints/appointments.md) | `GET` · `POST` · `GET /:id` · `PATCH /:id` · `DELETE /:id` |
| [Medical Records](docs/endpoints/medical-records.md) | `GET` · `POST` · `GET /:id` · `PATCH /:id` · `DELETE /:id` |
| [Prescriptions](docs/endpoints/prescriptions.md) | `GET` · `POST` · `GET /:id` · `PATCH /:id` · `DELETE /:id` |

---

## Workflow

A typical patient visit follows this sequence:
```
1. POST /api/v1/patients                     → Register a new patient
            ↓
2. POST /api/v1/appointments                 → Schedule an appointment
            ↓
3. PATCH /api/v1/appointments/:id            → Mark appointment as completed
            ↓
4. POST /api/v1/medical-records              → Record diagnosis or procedure
            ↓
5. POST /api/v1/prescriptions                → Issue a prescription
```

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

## Support

- **GitHub Issues:** [Open an issue](https://github.com/writingteacher/patient-api/issues)
- **GitHub Profile:** [writingteacher](https://github.com/writingteacher)

---

## About

This API was built as a **technical writing portfolio sample** to demonstrate:

- REST API documentation structure
- Multi-file documentation architecture
- Endpoint documentation with request and response examples
- JWT authentication documentation
- Error handling documentation
- Healthcare domain knowledge
- HIPAA compliance awareness
- Live API deployment

**Tech stack:** Node.js, Express.js, hosted on Render

---

*Built by [writingteacher](https://github.com/writingteacher)*