# Versioning

The Patient Management API uses **URL versioning**. The current version is `v1`.

---

## URL Structure

All endpoints are prefixed with the version number:
```
https://patient-api-vzzr.onrender.com/api/v1/patients
```

---

## Current Version

| Version | Status | Base URL |
|---------|--------|----------|
| `v1` | Active | `https://patient-api-vzzr.onrender.com/api/v1` |

---

## Why URL Versioning

URL versioning was chosen for this API because:

- It is explicit and visible in every request
- It works with all HTTP clients without special configuration
- It is easy to document and easy to test

---

## Breaking vs Non-Breaking Changes

Not every change requires a new version.

**Non-breaking changes** — made without a version bump:
- Adding new optional fields to a response
- Adding new optional request parameters
- Adding new endpoints

**Breaking changes** — require a new version:
- Removing or renaming existing fields
- Changing a field's data type
- Removing an endpoint
- Changing required fields

---

## Deprecation Policy

When a new version is released:

1. The previous version remains active for a minimum of **6 months**
2. A deprecation notice is added to the response headers
3. The change is documented in [CHANGELOG.md](../CHANGELOG.md)
4. The old version is removed after the deprecation period

---

## Future Versions

When `v2` is released, both versions will be available simultaneously:
```
/api/v1/patients   ← deprecated but still active
/api/v2/patients   ← current version
```