# Architecture

This document describes the data model, resource relationships, and clinical workflows supported by the Patient Management API.

---

## Data Model

The API is organized around four core resources:

| Resource | Description |
|----------|-------------|
| **Patients** | The central resource. All other resources belong to a patient. |
| **Appointments** | Scheduled visits between a patient and a physician. |
| **Medical Records** | Clinical records created during or after a patient visit. |
| **Prescriptions** | Medications prescribed to a patient by a physician. |

---

## Resource Relationships
```
Patient
  ├── Appointments
  │     └── patientId → Patient.id
  ├── Medical Records
  │     └── patientId → Patient.id
  └── Prescriptions
        └── patientId → Patient.id
```

Every appointment, medical record, and prescription belongs to exactly one patient via the `patientId` field. A patient can have many of each.

---

## Patient Workflow

A typical patient visit follows this sequence:
```
1. POST /api/v1/patients
   Register the patient in the system

2. POST /api/v1/appointments
   Schedule a visit with a physician

3. PATCH /api/v1/appointments/:id
   Update status to 'completed' after the visit

4. POST /api/v1/medical-records
   Record the diagnosis, procedure, or lab result

5. POST /api/v1/prescriptions
   Issue any medications prescribed during the visit
```

---

## Appointment Status Lifecycle
```
scheduled → completed
scheduled → cancelled
scheduled → no_show
```

| Status | Description |
|--------|-------------|
| `scheduled` | Default status when an appointment is created |
| `completed` | The appointment took place |
| `cancelled` | The appointment was cancelled before it occurred |
| `no_show` | The patient did not attend |

---

## Medical Record Types

| Type | Description |
|------|-------------|
| `diagnosis` | A condition identified by a physician |
| `lab_result` | Results from a blood test or other lab work |
| `procedure` | A medical procedure performed on the patient |
| `imaging` | X-ray, MRI, CT scan, or other imaging study |
| `progress_note` | A physician's notes on a patient's progress |
| `referral` | A referral to a specialist or another department |
| `discharge_summary` | Summary produced when a patient is discharged |

---

## Prescription Status Lifecycle
```
active → completed
active → cancelled
active → on_hold
on_hold → active
```

| Status | Description |
|--------|-------------|
| `active` | Default status when a prescription is created |
| `completed` | The full course of medication has been taken |
| `cancelled` | The prescription was discontinued |
| `on_hold` | The prescription is temporarily paused |

---

## Data Persistence

This API uses an **in-memory data store** seeded with realistic demo data. All data resets when the server restarts. This is intentional for demo and portfolio purposes. A production deployment would use a persistent database such as PostgreSQL or MongoDB.