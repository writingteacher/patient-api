# Appointment Endpoints

Base URL: `https://patient-api-vzzr.onrender.com/api/v1`

**Authentication required:** All endpoints require a Bearer token. See [Authentication](../authentication.md).

---

## GET /appointments

Returns a list of all appointments.

### Request

**Headers:**

| Header | Value |
|--------|-------|
| `Authorization` | `Bearer <token>` |

### Response

#### 200 — Success
```json
{
  "success": true,
  "data": [
    {
      "id": "appt-001",
      "patientId": "pat-001",
      "physicianName": "Dr. Jane Smith",
      "department": "Cardiology",
      "appointmentDate": "2025-04-15",
      "appointmentTime": "10:00",
      "status": "scheduled",
      "reason": "Annual cardiac checkup"
    }
  ]
}
```

---

## GET /appointments/:id

Returns a single appointment by ID.

### Request

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The appointment's unique ID |

### Responses

#### 200 — Success
```json
{
  "success": true,
  "data": {
    "id": "appt-001",
    "patientId": "pat-001",
    "physicianName": "Dr. Jane Smith",
    "department": "Cardiology",
    "appointmentDate": "2025-04-15",
    "appointmentTime": "10:00",
    "status": "scheduled",
    "reason": "Annual cardiac checkup"
  }
}
```

#### 404 — Not found
```json
{
  "success": false,
  "error": {
    "code": "APPOINTMENT_NOT_FOUND",
    "message": "Appointment with ID 'appt-999' not found."
  }
}
```

---

## POST /appointments

Schedules a new appointment for an existing patient.

### Request

**Headers:**

| Header | Value |
|--------|-------|
| `Authorization` | `Bearer <token>` |
| `Content-Type` | `application/json` |

**Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `patientId` | string | Yes | ID of the patient — must exist |
| `physicianName` | string | Yes | Full name of the attending physician |
| `appointmentDate` | string | Yes | Date in `YYYY-MM-DD` format |
| `appointmentTime` | string | Yes | Time in `HH:MM` format |
| `department` | string | No | Clinical department (e.g. Cardiology) |
| `reason` | string | No | Reason for the appointment |

**Example:**
```json
{
  "patientId": "pat-001",
  "physicianName": "Dr. Jane Smith",
  "department": "Cardiology",
  "appointmentDate": "2025-05-10",
  "appointmentTime": "11:00",
  "reason": "Follow-up consultation"
}
```

### Responses

#### 201 — Created
```json
{
  "success": true,
  "data": {
    "id": "appt-1773398810198",
    "patientId": "pat-001",
    "physicianName": "Dr. Jane Smith",
    "department": "Cardiology",
    "appointmentDate": "2025-05-10",
    "appointmentTime": "11:00",
    "status": "scheduled",
    "reason": "Follow-up consultation"
  }
}
```

#### 400 — Missing required fields
```json
{
  "success": false,
  "error": {
    "code": "MISSING_REQUIRED_FIELDS",
    "message": "patientId, physicianName, appointmentDate, and appointmentTime are required."
  }
}
```

#### 404 — Patient not found
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

## PATCH /appointments/:id

Updates an existing appointment. Use this endpoint to reschedule or update the status of an appointment.

### Request

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The appointment's unique ID |

**Body:**

All fields are optional. Include only the fields you want to update.

| Field | Type | Description |
|-------|------|-------------|
| `physicianName` | string | Full name of the attending physician |
| `department` | string | Clinical department |
| `appointmentDate` | string | Date in `YYYY-MM-DD` format |
| `appointmentTime` | string | Time in `HH:MM` format |
| `status` | string | One of: `scheduled`, `completed`, `cancelled`, `no_show` |
| `reason` | string | Reason for the appointment |

**Example — cancel an appointment:**
```json
{
  "status": "cancelled"
}
```

**Example — reschedule:**
```json
{
  "appointmentDate": "2025-05-20",
  "appointmentTime": "14:00"
}
```

### Responses

#### 200 — Updated
```json
{
  "success": true,
  "data": {
    "id": "appt-001",
    "patientId": "pat-001",
    "physicianName": "Dr. Jane Smith",
    "department": "Cardiology",
    "appointmentDate": "2025-04-15",
    "appointmentTime": "10:00",
    "status": "cancelled",
    "reason": "Annual cardiac checkup"
  }
}
```

#### 404 — Not found
```json
{
  "success": false,
  "error": {
    "code": "APPOINTMENT_NOT_FOUND",
    "message": "Appointment with ID 'appt-999' not found."
  }
}
```

---

## DELETE /appointments/:id

Permanently deletes an appointment.

### Request

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The appointment's unique ID |

### Responses

#### 200 — Deleted
```json
{
  "success": true,
  "data": {
    "message": "Appointment deleted successfully."
  }
}
```

#### 404 — Not found
```json
{
  "success": false,
  "error": {
    "code": "APPOINTMENT_NOT_FOUND",
    "message": "Appointment with ID 'appt-999' not found."
  }
}
```