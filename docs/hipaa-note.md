# HIPAA Considerations

This document outlines the HIPAA compliance considerations relevant to the Patient Management API and what a production deployment would require.

---

## What is HIPAA?

HIPAA (Health Insurance Portability and Accountability Act) is a US federal law that sets standards for protecting sensitive patient health information. Any system that stores, processes, or transmits Protected Health Information (PHI) must comply with HIPAA.

PHI includes any information that can identify a patient and relates to:
- Their past, present, or future health condition
- The provision of healthcare to them
- Payment for healthcare services

---

## This API and HIPAA

This API is a **demonstration project** built for portfolio purposes. It is not HIPAA compliant and should not be used to store or process real patient data.

The data store is in-memory, not encrypted, and resets on every server restart. Demo credentials are publicly visible in this repository.

---

## What a Production Deployment Would Require

A production healthcare API handling real PHI would need the following controls:

### Transport Security
- TLS/HTTPS enforced on all endpoints — no plain HTTP connections accepted
- TLS 1.2 or higher required

### Access Control
- Role-based access control (RBAC) restricting which users can access which data
- Minimum necessary standard — users receive only the PHI required for their role
- Multi-factor authentication for all users with PHI access

### Audit Logging
- Every read, write, update, and delete of PHI must be logged
- Logs must include: who accessed the data, what data was accessed, and when
- Audit logs must be tamper-proof and retained for a minimum of 6 years

### Data Protection
- Encryption at rest for all PHI stored in the database
- Encryption in transit for all data moving between services
- Data masking or redaction in logs and error responses

### Infrastructure
- Business Associate Agreement (BAA) with any cloud hosting provider
- Regular security risk assessments
- Documented incident response plan for data breaches

### Application Controls
- Automatic session timeout after inactivity
- Account lockout after repeated failed login attempts
- Input validation and sanitization to prevent injection attacks

---

## Further Reading

- [HHS HIPAA Security Rule](https://www.hhs.gov/hipaa/for-professionals/security/index.html)
- [NIST Healthcare Cybersecurity Resources](https://www.nist.gov/healthcare)