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

module.exports = router;