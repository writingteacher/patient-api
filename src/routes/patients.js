const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const store = require('../data/store');

const router = express.Router();

router.use(authenticateToken);

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: store.patients
  });
});

router.get('/:id', (req, res) => {
  const patient = store.patients.find(p => p.id === req.params.id);

  if (!patient) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'PATIENT_NOT_FOUND',
        message: `Patient with ID '${req.params.id}' not found.`
      }
    });
  }

  res.json({
    success: true,
    data: patient
  });
});
router.post('/', (req, res) => {
  const { firstName, lastName, dateOfBirth, gender, email, phone } = req.body;

  if (!firstName || !lastName || !dateOfBirth || !gender || !email) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_REQUIRED_FIELDS',
        message: 'firstName, lastName, dateOfBirth, gender, and email are required.'
      }
    });
  }

  const existing = store.patients.find(p => p.email === email);
  if (existing) {
    return res.status(409).json({
      success: false,
      error: {
        code: 'EMAIL_ALREADY_EXISTS',
        message: `A patient with email '${email}' already exists.`
      }
    });
  }

  const newPatient = {
    id: `pat-${Date.now()}`,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    phone: phone || null
  };

  store.patients.push(newPatient);

  res.status(201).json({
    success: true,
    data: newPatient
  });
});
router.patch('/:id', (req, res) => {
  const idx = store.patients.findIndex(p => p.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'PATIENT_NOT_FOUND',
        message: `Patient with ID '${req.params.id}' not found.`
      }
    });
  }

  const immutable = ['id'];
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([k]) => !immutable.includes(k))
  );

  store.patients[idx] = { ...store.patients[idx], ...updates };

  res.json({
    success: true,
    data: store.patients[idx]
  });
});
router.delete('/:id', (req, res) => {
  const idx = store.patients.findIndex(p => p.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'PATIENT_NOT_FOUND',
        message: `Patient with ID '${req.params.id}' not found.`
      }
    });
  }

  store.patients.splice(idx, 1);

  res.json({
    success: true,
    data: {
      message: 'Patient deleted successfully.'
    }
  });
});
module.exports = router;