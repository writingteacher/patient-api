const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const store = require('../data/store');

const router = express.Router();

router.use(authenticateToken);

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: store.appointments
  });
});

router.get('/:id', (req, res) => {
  const appointment = store.appointments.find(a => a.id === req.params.id);

  if (!appointment) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'APPOINTMENT_NOT_FOUND',
        message: `Appointment with ID '${req.params.id}' not found.`
      }
    });
  }

  res.json({
    success: true,
    data: appointment
  });
});

router.post('/', (req, res) => {
  const { patientId, physicianName, appointmentDate, appointmentTime, reason } = req.body;

  if (!patientId || !physicianName || !appointmentDate || !appointmentTime) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_REQUIRED_FIELDS',
        message: 'patientId, physicianName, appointmentDate, and appointmentTime are required.'
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

  const newAppointment = {
    id: `appt-${Date.now()}`,
    patientId,
    physicianName,
    appointmentDate,
    appointmentTime,
    status: 'scheduled',
    reason: reason || null
  };

  store.appointments.push(newAppointment);

  res.status(201).json({
    success: true,
    data: newAppointment
  });
});

router.patch('/:id', (req, res) => {
  const idx = store.appointments.findIndex(a => a.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'APPOINTMENT_NOT_FOUND',
        message: `Appointment with ID '${req.params.id}' not found.`
      }
    });
  }

  const immutable = ['id', 'patientId'];
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([k]) => !immutable.includes(k))
  );

  store.appointments[idx] = { ...store.appointments[idx], ...updates };

  res.json({
    success: true,
    data: store.appointments[idx]
  });
});

router.delete('/:id', (req, res) => {
  const idx = store.appointments.findIndex(a => a.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'APPOINTMENT_NOT_FOUND',
        message: `Appointment with ID '${req.params.id}' not found.`
      }
    });
  }

  store.appointments.splice(idx, 1);

  res.json({
    success: true,
    data: {
      message: 'Appointment deleted successfully.'
    }
  });
});

module.exports = router;