const store = {
  patients: [
    {
      id: 'pat-001',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-04-12',
      gender: 'male',
      email: 'r.johnson@email.com',
      phone: '555-0101'
    },
    {
      id: 'pat-002',
      firstName: 'Linda',
      lastName: 'Garcia',
      dateOfBirth: '1991-09-28',
      gender: 'female',
      email: 'l.garcia@email.com',
      phone: '555-0201'
    }
  ],

  appointments: [
    {
      id: 'appt-001',
      patientId: 'pat-001',
      physicianName: 'Dr. Jane Smith',
      department: 'Cardiology',
      appointmentDate: '2025-04-15',
      appointmentTime: '10:00',
      status: 'scheduled',
      reason: 'Annual cardiac checkup'
    },
    {
      id: 'appt-002',
      patientId: 'pat-002',
      physicianName: 'Dr. Michael Chen',
      department: 'General Practice',
      appointmentDate: '2025-04-10',
      appointmentTime: '14:30',
      status: 'completed',
      reason: 'Follow-up on blood pressure medication'
    }
  ],

  medicalRecords: [
    {
      id: 'rec-001',
      patientId: 'pat-001',
      recordType: 'diagnosis',
      title: 'Hypertension Diagnosis',
      description: 'Patient diagnosed with stage 1 hypertension. Blood pressure recorded at 145/92 mmHg.',
      physician: 'Dr. Jane Smith',
      recordDate: '2023-02-10'
    },
    {
      id: 'rec-002',
      patientId: 'pat-002',
      recordType: 'lab_result',
      title: 'Complete Blood Count (CBC)',
      description: 'CBC panel results — all values within normal range. Hemoglobin: 13.8 g/dL.',
      physician: 'Dr. Michael Chen',
      recordDate: '2024-01-05'
    }
  ],

  prescriptions: [
    {
      id: 'rx-001',
      patientId: 'pat-001',
      medicationName: 'Lisinopril',
      dosage: '10mg',
      frequency: 'once daily',
      route: 'oral',
      prescribedBy: 'Dr. Jane Smith',
      prescribedDate: '2023-02-10',
      startDate: '2023-02-11',
      endDate: null,
      refillsRemaining: 5,
      status: 'active',
      notes: 'Take in the morning. Monitor blood pressure weekly.'
    },
    {
      id: 'rx-002',
      patientId: 'pat-002',
      medicationName: 'Metoprolol',
      dosage: '25mg',
      frequency: 'twice daily',
      route: 'oral',
      prescribedBy: 'Dr. Michael Chen',
      prescribedDate: '2024-01-05',
      startDate: '2024-01-06',
      endDate: '2024-07-06',
      refillsRemaining: 2,
      status: 'active',
      notes: 'Take with food. Do not stop abruptly.'
    }
  ]
};

module.exports = store;