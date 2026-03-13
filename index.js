const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const authRoutes = require('./src/routes/auth');
const patientRoutes = require('./src/routes/patients');
const appointmentRoutes = require('./src/routes/appointments');
const medicalRecordRoutes = require('./src/routes/medicalRecords');
const prescriptionRoutes = require('./src/routes/prescriptions');

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocument = YAML.load('./docs/openapi.yaml');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.json({
    name: 'Patient Management API',
    version: '1.0.0',
    status: 'running',
    documentation: '/api-docs'
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/medical-records', medicalRecordRoutes);
app.use('/api/v1/prescriptions', prescriptionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Docs available at http://localhost:${PORT}/api-docs`);
});