const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const store = require('../data/store');

const router = express.Router();

router.use(authenticateToken);

const VALID_RECORD_TYPES = ['diagnosis', 'lab_result', 'procedure', 'imaging', 'progress_note', 'referral', 'discharge_summary'];

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: store.medicalRecords
  });
});

router.get('/:id', (req, res) => {
  const record = store.medicalRecords.find(r => r.id === req.params.id);

  if (!record) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'RECORD_NOT_FOUND',
        message: `Medical record with ID '${req.params.id}' not found.`
      }
    });
  }

  res.json({
    success: true,
    data: record
  });
});

router.post('/', (req, res) => {
  const { patientId, recordType, title, description, physician, recordDate } = req.body;

  if (!patientId || !recordType || !title || !physician || !recordDate) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_REQUIRED_FIELDS',
        message: 'patientId, recordType, title, physician, and recordDate are required.'
      }
    });
  }

  if (!VALID_RECORD_TYPES.includes(recordType)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_RECORD_TYPE',
        message: `recordType must be one of: ${VALID_RECORD_TYPES.join(', ')}.`
      }
    });
  }

  const patient = store.patients.find(p => p.id === patientId);
  if (!patient) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'PATIENT_NOT_FOUND',
        message: `Patient with ID '${patientId}' not found.`
      }
    });
  }

  const newRecord = {
    id: `rec-${Date.now()}`,
    patientId,
    recordType,
    title,
    description: description || null,
    physician,
    recordDate
  };

  store.medicalRecords.push(newRecord);

  res.status(201).json({
    success: true,
    data: newRecord
  });
});

router.patch('/:id', (req, res) => {
  const idx = store.medicalRecords.findIndex(r => r.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'RECORD_NOT_FOUND',
        message: `Medical record with ID '${req.params.id}' not found.`
      }
    });
  }

  const immutable = ['id', 'patientId'];
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([k]) => !immutable.includes(k))
  );

  store.medicalRecords[idx] = { ...store.medicalRecords[idx], ...updates };

  res.json({
    success: true,
    data: store.medicalRecords[idx]
  });
});

router.delete('/:id', (req, res) => {
  const idx = store.medicalRecords.findIndex(r => r.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'RECORD_NOT_FOUND',
        message: `Medical record with ID '${req.params.id}' not found.`
      }
    });
  }

  store.medicalRecords.splice(idx, 1);

  res.json({
    success: true,
    data: {
      message: 'Medical record deleted successfully.'
    }
  });
});

module.exports = router;