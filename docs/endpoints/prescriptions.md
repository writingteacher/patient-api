# Prescription Endpoints

Base URL: `https://patient-api-vzzr.onrender.com/api/v1`

**Authentication required:** All endpoints require a Bearer token. See [Authentication](../authentication.md).

---

## GET /prescriptions

Returns a list of all prescriptions.

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
      "id": "rx-001",
      "patientId": "pat-001",
      "medicationName": "Lisinopril",
      "dosage": "10mg",
      "frequency": "once daily",
      "route": "oral",
      "prescribedBy": "Dr. Jane Smith",
      "prescribedDate": "2023-02-10",
      "startDate": "2023-02-11",
      "endDate": null,
      "refillsRemaining": 5,
      "status": "active",
      "notes": "Take in the morning. Monitor blood pressure weekly."
    }
  ]
}
```

---

## GET /prescriptions/:id

Returns a single prescription by ID.

### Request

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The prescription's unique ID |

### Responses

#### 200 — Success
```json
{
  "success": true,
  "data": {
    "id": "rx-001",
    "patientId": "pat-001",
    "medicationName": "Lisinopril",
    "dosage": "10mg",
    "frequency": "once daily",
    "route": "oral",
    "prescribedBy": "Dr. Jane Smith",
    "prescribedDate": "2023-02-10",
    "startDate": "2023-02-11",
    "endDate": null,
    "refillsRemaining": 5,
    "status": "active",
    "notes": "Take in the morning. Monitor blood pressure weekly."
  }
}
```

#### 404 — Not found
```json
{
  "success": false,
  "error": {
    "code": "PRESCRIPTION_NOT_FOUND",
    "message": "Prescription with ID 'rx-999' not found."
  }
}
```

---

## POST /prescriptions

Creates a new prescription for an existing patient.

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
| `medicationName` | string | Yes | Name of the medication |
| `dosage` | string | Yes | Dosage amount (e.g. `10mg`) |
| `frequency` | string | Yes | How often to take the medication (e.g. `once daily`) |
| `prescribedBy` | string | Yes | Full name of the prescribing physician |
| `prescribedDate` | string | Yes | Date prescribed in `YYYY-MM-DD` format |
| `startDate` | string | Yes | Date to start taking the medication in `YYYY-MM-DD` format |
| `route` | string | No | Route of administration — defaults to `oral` |
| `notes` | string | No | Additional instructions for the patient |

**Allowed `route` values:**

`oral`, `intravenous`, `intramuscular`, `subcutaneous`, `topical`, `inhaled`, `sublingual`, `rectal`, `ophthalmic`, `otic`

**Example:**
```json
{
  "patientId": "pat-001",
  "medicationName": "Metformin",
  "dosage": "500mg",
  "frequency": "twice daily with meals",
  "route": "oral",
  "prescribedBy": "Dr. Jane Smith",
  "prescribedDate": "2025-04-15",
  "startDate": "2025-04-16",
  "notes": "Monitor blood glucose levels."
}
```

### Responses

#### 201 — Created
```json
{
  "success": true,
  "data": {
    "id": "rx-1773399249131",
    "patientId": "pat-001",
    "medicationName": "Metformin",
    "dosage": "500mg",
    "frequency": "twice daily with meals",
    "route": "oral",
    "prescribedBy": "Dr. Jane Smith",
    "prescribedDate": "2025-04-15",
    "startDate": "2025-04-16",
    "endDate": null,
    "refillsRemaining": 0,
    "status": "active",
    "notes": "Monitor blood glucose levels."
  }
}
```

#### 400 — Missing required fields
```json
{
  "success": false,
  "error": {
    "code": "MISSING_REQUIRED_FIELDS",
    "message": "patientId, medicationName, dosage, frequency, prescribedBy, prescribedDate, and startDate are required."
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

## PATCH /prescriptions/:id

Updates an existing prescription. Use this endpoint to change the status, adjust refills, or update instructions.

### Request

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The prescription's unique ID |

**Body:**

All fields are optional. Include only the fields you want to update.

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | One of: `active`, `completed`, `cancelled`, `on_hold` |
| `dosage` | string | Updated dosage amount |
| `frequency` | string | Updated frequency |
| `refillsRemaining` | integer | Updated refill count |
| `endDate` | string | Date to stop the medication in `YYYY-MM-DD` format |
| `notes` | string | Updated patient instructions |

**Example — cancel a prescription:**
```json
{
  "status": "cancelled"
}
```

**Example — update refills:**
```json
{
  "refillsRemaining": 3
}
```

### Responses

#### 200 — Updated
```json
{
  "success": true,
  "data": {
    "id": "rx-001",
    "patientId": "pat-001",
    "medicationName": "Lisinopril",
    "dosage": "10mg",
    "frequency": "once daily",
    "route": "oral",
    "prescribedBy": "Dr. Jane Smith",
    "prescribedDate": "2023-02-10",
    "startDate": "2023-02-11",
    "endDate": null,
    "refillsRemaining": 5,
    "status": "cancelled",
    "notes": "Take in the morning. Monitor blood pressure weekly."
  }
}
```

#### 400 — Invalid status
```json
{
  "success": false,
  "error": {
    "code": "INVALID_STATUS",
    "message": "status must be one of: active, completed, cancelled, on_hold."
  }
}
```

#### 404 — Not found
```json
{
  "success": false,
  "error": {
    "code": "PRESCRIPTION_NOT_FOUND",
    "message": "Prescription with ID 'rx-999' not found."
  }
}
```

---

## DELETE /prescriptions/:id

Permanently deletes a prescription.

### Request

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The prescription's unique ID |

### Responses

#### 200 — Deleted
```json
{
  "success": true,
  "data": {
    "message": "Prescription deleted successfully."
  }
}
```

#### 404 — Not found
```json
{
  "success": false,
  "error": {
    "code": "PRESCRIPTION_NOT_FOUND",
    "message": "Prescription with ID 'rx-999' not found."
  }
}
```