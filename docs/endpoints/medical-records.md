# Medical Record Endpoints

Base URL: `https://patient-api-vzzr.onrender.com/api/v1`

**Authentication required:** All endpoints require a Bearer token. See [Authentication](../authentication.md).

---

## GET /medical-records

Returns a list of all medical records.

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
      "id": "rec-001",
      "patientId": "pat-001",
      "recordType": "diagnosis",
      "title": "Hypertension Diagnosis",
      "description": "Patient diagnosed with stage 1 hypertension. Blood pressure recorded at 145/92 mmHg.",
      "physician": "Dr. Jane Smith",
      "recordDate": "2023-02-10"
    }
  ]
}
```

---

## GET /medical-records/:id

Returns a single medical record by ID.

### Request

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The record's unique ID |

### Responses

#### 200 — Success
```json
{
  "success": true,
  "data": {
    "id": "rec-001",
    "patientId": "pat-001",
    "recordType": "diagnosis",
    "title": "Hypertension Diagnosis",
    "description": "Patient diagnosed with stage 1 hypertension. Blood pressure recorded at 145/92 mmHg.",
    "physician": "Dr. Jane Smith",
    "recordDate": "2023-02-10"
  }
}
```

#### 404 — Not found
```json
{
  "success": false,
  "error": {
    "code": "RECORD_NOT_FOUND",
    "message": "Medical record with ID 'rec-999' not found."
  }
}
```

---

## POST /medical-records

Creates a new medical record for an existing patient.

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
| `recordType` | string | Yes | Type of record — see allowed values below |
| `title` | string | Yes | Short descriptive title |
| `physician` | string | Yes | Full name of the recording physician |
| `recordDate` | string | Yes | Date in `YYYY-MM-DD` format |
| `description` | string | No | Detailed clinical notes |

**Allowed `recordType` values:**

| Value | Description |
|-------|-------------|
| `diagnosis` | A condition identified by a physician |
| `lab_result` | Results from laboratory tests |
| `procedure` | A medical procedure performed |
| `imaging` | X-ray, MRI, CT scan, or other imaging |
| `progress_note` | Physician notes on patient progress |
| `referral` | Referral to a specialist |
| `discharge_summary` | Summary on patient discharge |

**Example:**
```json
{
  "patientId": "pat-001",
  "recordType": "imaging",
  "title": "Chest X-Ray",
  "description": "No abnormalities detected.",
  "physician": "Dr. Jane Smith",
  "recordDate": "2025-04-15"
}
```

### Responses

#### 201 — Created
```json
{
  "success": true,
  "data": {
    "id": "rec-1773399249131",
    "patientId": "pat-001",
    "recordType": "imaging",
    "title": "Chest X-Ray",
    "description": "No abnormalities detected.",
    "physician": "Dr. Jane Smith",
    "recordDate": "2025-04-15"
  }
}
```

#### 400 — Invalid record type
```json
{
  "success": false,
  "error": {
    "code": "INVALID_RECORD_TYPE",
    "message": "recordType must be one of: diagnosis, lab_result, procedure, imaging, progress_note, referral, discharge_summary."
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

## PATCH /medical-records/:id

Updates an existing medical record.

### Request

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The record's unique ID |

**Body:**

All fields are optional. Include only the fields you want to update.

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Short descriptive title |
| `description` | string | Detailed clinical notes |
| `physician` | string | Full name of the recording physician |
| `recordDate` | string | Date in `YYYY-MM-DD` format |
| `recordType` | string | Type of record |

**Example:**
```json
{
  "description": "Updated: Mild hypertension confirmed. Medication prescribed."
}
```

### Responses

#### 200 — Updated
```json
{
  "success": true,
  "data": {
    "id": "rec-001",
    "patientId": "pat-001",
    "recordType": "diagnosis",
    "title": "Hypertension Diagnosis",
    "description": "Updated: Mild hypertension confirmed. Medication prescribed.",
    "physician": "Dr. Jane Smith",
    "recordDate": "2023-02-10"
  }
}
```

#### 404 — Not found
```json
{
  "success": false,
  "error": {
    "code": "RECORD_NOT_FOUND",
    "message": "Medical record with ID 'rec-999' not found."
  }
}
```

---

## DELETE /medical-records/:id

Permanently deletes a medical record.

### Request

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The record's unique ID |

### Responses

#### 200 — Deleted
```json
{
  "success": true,
  "data": {
    "message": "Medical record deleted successfully."
  }
}
```

#### 404 — Not found
```json
{
  "success": false,
  "error": {
    "code": "RECORD_NOT_FOUND",
    "message": "Medical record with ID 'rec-999' not found."
  }
}
```