const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const store = require('../data/store');

const router = express.Router();

router.use(authenticateToken);

const VALID_STATUSES = ['active', 'completed', 'cancelled', 'on_hold'];

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: store.prescriptions
  });
});

router.get('/:id', (req, res) => {
  const prescription = store.prescriptions.find(r => r.id === req.params.id);

  if (!prescription) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'PRESCRIPTION_NOT_FOUND',
        message: `Prescription with ID '${req.params.id}' not found.`
      }
    });
  }

  res.json({
    success: true,
    data: prescription
  });
});

router.post('/', (req, res) => {
  const { patientId, medicationName, dosage, frequency, route, prescribedBy, prescribedDate, startDate, notes } = req.body;

  if (!patientId || !medicationName || !dosage || !frequency || !prescribedBy || !prescribedDate || !startDate) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_REQUIRED_FIELDS',
        message: 'patientId, medicationName, dosage, frequency, prescribedBy, prescribedDate, and startDate are required.'
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

  const newPrescription = {
    id: `rx-${Date.now()}`,
    patientId,
    medicationName,
    dosage,
    frequency,
    route: route || 'oral',
    prescribedBy,
    prescribedDate,
    startDate,
    endDate: null,
    refillsRemaining: 0,
    status: 'active',
    notes: notes || null
  };

  store.prescriptions.push(newPrescription);

  res.status(201).json({
    success: true,
    data: newPrescription
  });
});

router.patch('/:id', (req, res) => {
  const idx = store.prescriptions.findIndex(r => r.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'PRESCRIPTION_NOT_FOUND',
        message: `Prescription with ID '${req.params.id}' not found.`
      }
    });
  }

  if (req.body.status && !VALID_STATUSES.includes(req.body.status)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_STATUS',
        message: `status must be one of: ${VALID_STATUSES.join(', ')}.`
      }
    });
  }

  const immutable = ['id', 'patientId'];
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([k]) => !immutable.includes(k))
  );

  store.prescriptions[idx] = { ...store.prescriptions[idx], ...updates };

  res.json({
    success: true,
    data: store.prescriptions[idx]
  });
});

router.delete('/:id', (req, res) => {
  const idx = store.prescriptions.findIndex(r => r.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'PRESCRIPTION_NOT_FOUND',
        message: `Prescription with ID '${req.params.id}' not found.`
      }
    });
  }

  store.prescriptions.splice(idx, 1);

  res.json({
    success: true,
    data: {
      message: 'Prescription deleted successfully.'
    }
  });
});

module.exports = router;