# Changelog

All notable changes to the Patient Management API are documented here.

---

## [1.0.0] — 2026-03-13

### Initial release

**Authentication**
- `POST /api/v1/auth/login` — JWT Bearer token authentication with 8-hour expiry

**Patients**
- `GET /api/v1/patients` — List all patients
- `POST /api/v1/patients` — Create a patient
- `GET /api/v1/patients/:id` — Get a patient by ID
- `PATCH /api/v1/patients/:id` — Update a patient
- `DELETE /api/v1/patients/:id` — Delete a patient

**Appointments**
- `GET /api/v1/appointments` — List all appointments
- `POST /api/v1/appointments` — Schedule an appointment
- `GET /api/v1/appointments/:id` — Get an appointment by ID
- `PATCH /api/v1/appointments/:id` — Update or cancel an appointment
- `DELETE /api/v1/appointments/:id` — Delete an appointment

**Medical Records**
- `GET /api/v1/medical-records` — List all medical records
- `POST /api/v1/medical-records` — Create a medical record
- `GET /api/v1/medical-records/:id` — Get a record by ID
- `PATCH /api/v1/medical-records/:id` — Update a record
- `DELETE /api/v1/medical-records/:id` — Delete a record

**Prescriptions**
- `GET /api/v1/prescriptions` — List all prescriptions
- `POST /api/v1/prescriptions` — Create a prescription
- `GET /api/v1/prescriptions/:id` — Get a prescription by ID
- `PATCH /api/v1/prescriptions/:id` — Update or cancel a prescription
- `DELETE /api/v1/prescriptions/:id` — Delete a prescription

**Documentation**
- OpenAPI 3.0 spec with Swagger UI at `/api-docs`
- Authentication guide
- Error handling reference
- Versioning policy
- Architecture and data model
- Glossary
- HIPAA considerations
- Getting Started guide
- Individual endpoint documentation
- Postman collection