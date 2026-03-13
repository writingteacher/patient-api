# Glossary

Definitions for healthcare and API terms used throughout this documentation.

---

## Healthcare Terms

**Appointment**
A scheduled visit between a patient and a physician at a specific date and time.

**Diagnosis**
A physician's identification of a disease or condition based on symptoms, examination, or test results.

**Discharge Summary**
A clinical document produced when a patient is released from a hospital or care facility. Summarizes the patient's condition, treatment, and follow-up instructions.

**ECG / EKG (Electrocardiogram)**
A test that records the electrical activity of the heart. Commonly referenced in cardiology medical records.

**Emergency Contact**
A person designated by the patient to be contacted in the event of a medical emergency.

**Imaging**
Diagnostic procedures that produce visual representations of the inside of the body. Includes X-ray, MRI, CT scan, and ultrasound.

**Insurance Policy Number**
A unique identifier assigned by an insurance provider to a patient's coverage plan.

**Lab Result**
The output of a laboratory test such as a blood count, lipid panel, or urinalysis.

**PHI (Protected Health Information)**
Any information that can identify a patient and relates to their health, treatment, or payment for healthcare. PHI is protected under HIPAA.

**Physician**
A licensed medical doctor responsible for diagnosing and treating patients.

**Prescription**
A physician's written order for a medication, including the drug name, dosage, frequency, and route of administration.

**Procedure**
A medical intervention performed on a patient, such as surgery, biopsy, or echocardiogram.

**Progress Note**
A clinical note written by a physician documenting a patient's current condition and response to treatment.

**Referral**
A physician's recommendation that a patient see a specialist or another healthcare provider.

---

## API Terms

**Bearer Token**
An access token included in the `Authorization` header of an API request. Format: `Authorization: Bearer <token>`.

**CRUD**
Create, Read, Update, Delete — the four basic operations performed on a resource.

**Endpoint**
A specific URL that accepts HTTP requests. For example, `POST /api/v1/patients`.

**HTTP Method**
The type of action being performed in a request. Common methods used in this API: `GET`, `POST`, `PATCH`, `DELETE`.

**JWT (JSON Web Token)**
A compact, signed token used to authenticate API requests. Contains encoded user information and an expiry time.

**PATCH**
An HTTP method used to apply a partial update to a resource. Only the fields included in the request body are changed.

**Resource**
A data entity exposed by the API. This API has four resources: Patients, Appointments, Medical Records, and Prescriptions.

**REST (Representational State Transfer)**
An architectural style for building APIs that uses standard HTTP methods and URLs to represent resources.

**Status Code**
A three-digit number returned with every API response indicating whether the request succeeded. Examples: `200 OK`, `404 Not Found`, `401 Unauthorized`.

**URL Versioning**
A strategy for managing API changes by including the version number in the URL path. Example: `/api/v1/patients`.