# Error Handling

The Patient Management API uses consistent error responses across all endpoints. Every error returns a JSON object with a `success` field set to `false` and an `error` object containing a machine-readable `code` and a human-readable `message`.

---

## Error Response Structure
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

## HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| `200` | Success |
| `201` | Resource created |
| `400` | Bad request — missing or invalid fields |
| `401` | Unauthorized — missing or invalid token |
| `404` | Resource not found |
| `409` | Conflict — resource already exists |
| `500` | Internal server error |

---

## Error Codes

### Authentication Errors

| Code | Status | Description |
|------|--------|-------------|
| `MISSING_TOKEN` | 401 | No Authorization header provided |
| `INVALID_TOKEN` | 401 | Token is malformed or has expired |
| `INVALID_CREDENTIALS` | 401 | Wrong username or password |
| `MISSING_CREDENTIALS` | 400 | Username or password not provided |

### Patient Errors

| Code | Status | Description |
|------|--------|-------------|
| `PATIENT_NOT_FOUND` | 404 | No patient exists with the given ID |
| `EMAIL_ALREADY_EXISTS` | 409 | A patient with that email is already registered |
| `MISSING_REQUIRED_FIELDS` | 400 | One or more required fields are absent |

### Appointment Errors

| Code | Status | Description |
|------|--------|-------------|
| `APPOINTMENT_NOT_FOUND` | 404 | No appointment exists with the given ID |
| `MISSING_REQUIRED_FIELDS` | 400 | One or more required fields are absent |

### Medical Record Errors

| Code | Status | Description |
|------|--------|-------------|
| `RECORD_NOT_FOUND` | 404 | No medical record exists with the given ID |
| `INVALID_RECORD_TYPE` | 400 | The recordType value is not in the allowed list |
| `MISSING_REQUIRED_FIELDS` | 400 | One or more required fields are absent |

### Prescription Errors

| Code | Status | Description |
|------|--------|-------------|
| `PRESCRIPTION_NOT_FOUND` | 404 | No prescription exists with the given ID |
| `INVALID_STATUS` | 400 | The status value is not in the allowed list |
| `MISSING_REQUIRED_FIELDS` | 400 | One or more required fields are absent |

---

## Validation Errors

When required fields are missing, the response includes a `fields` array listing every missing field:
```json
{
  "success": false,
  "error": {
    "code": "MISSING_REQUIRED_FIELDS",
    "message": "firstName, lastName, dateOfBirth, gender, and email are required.",
    "fields": ["firstName", "email"]
  }
}
```

---

## 500 Internal Server Error

If something unexpected goes wrong on the server:
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred."
  }
}
```

If you receive a 500 error, open a GitHub issue with the request details.