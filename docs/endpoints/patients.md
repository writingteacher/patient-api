# Patient Endpoints

Base URL: `https://patient-api-vzzr.onrender.com/api/v1`

**Authentication required:** All endpoints require a Bearer token. See [Authentication](../authentication.md).

---

## GET /patients

Returns a list of all patients.

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

## GET /patients/:id

Returns a single patient by ID.

### Request

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The patient's unique ID |

### Responses

#### 200 — Success
```json
{
  "success": true,
  "data": {
    "id": "pat-001",
    "firstName": "Robert",
    "lastName": "Johnson",
    "dateOfBirth": "1978-04-12",
    "gender": "male",
    "email": "r.johnson@email.com",
    "phone": "555-0101"
  }
}
```

#### 404 — Not found
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

## POST /patients

Creates a new patient.

### Request

**Headers:**

| Header | Value |
|--------|-------|
| `Authorization` | `Bearer <token>` |
| `Content-Type` | `application/json` |

**Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `firstName` | string | Yes | Patient's first name |
| `lastName` | string | Yes | Patient's last name |
| `dateOfBirth` | string | Yes | Date of birth in `YYYY-MM-DD` format |
| `gender` | string | Yes | One of: `male`, `female`, `non_binary`, `prefer_not_to_say` |
| `email` | string | Yes | Patient's email address — must be unique |
| `phone` | string | No | Patient's phone number |

**Example:**
```json
{
  "firstName": "Maria",
  "lastName": "Santos",
  "dateOfBirth": "1985-07-22",
  "gender": "female",
  "email": "m.santos@email.com",
  "phone": "555-0404"
}
```

### Responses

#### 201 — Created
```json
{
  "success": true,
  "data": {
    "id": "pat-1773396744716",
    "firstName": "Maria",
    "lastName": "Santos",
    "dateOfBirth": "1985-07-22",
    "gender": "female",
    "email": "m.santos@email.com",
    "phone": "555-0404"
  }
}
```

#### 400 — Missing required fields
```json
{
  "success": false,
  "error": {
    "code": "MISSING_REQUIRED_FIELDS",
    "message": "firstName, lastName, dateOfBirth, gender, and email are required."
  }
}
```

#### 409 — Email already exists
```json
{
  "success": false,
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "A patient with email 'm.santos@email.com' already exists."
  }
}
```

---

## PATCH /patients/:id

Updates one or more fields on an existing patient. Only the fields included in the request body are changed.

### Request

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The patient's unique ID |

**Body:**

All fields are optional. Include only the fields you want to update.

| Field | Type | Description |
|-------|------|-------------|
| `firstName` | string | Patient's first name |
| `lastName` | string | Patient's last name |
| `dateOfBirth` | string | Date of birth in `YYYY-MM-DD` format |
| `gender` | string | One of: `male`, `female`, `non_binary`, `prefer_not_to_say` |
| `email` | string | Must be unique across all patients |
| `phone` | string | Patient's phone number |

**Example:**
```json
{
  "phone": "555-9999"
}
```

### Responses

#### 200 — Updated
```json
{
  "success": true,
  "data": {
    "id": "pat-001",
    "firstName": "Robert",
    "lastName": "Johnson",
    "dateOfBirth": "1978-04-12",
    "gender": "male",
    "email": "r.johnson@email.com",
    "phone": "555-9999"
  }
}
```

#### 404 — Not found
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

## DELETE /patients/:id

Permanently deletes a patient record.

### Request

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The patient's unique ID |

### Responses

#### 200 — Deleted
```json
{
  "success": true,
  "data": {
    "message": "Patient deleted successfully."
  }
}
```

#### 404 — Not found
```json
{
  "success": false,
  "error": {
    "code": "PATIENT_NOT_FOUND",
    "message": "Patient with ID 'pat-999' not found."
  }
}
```