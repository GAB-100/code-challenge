const express = require('express');
const axios = require('axios');
const { body, validationResult } = require('express-validator');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// GET /api/supervisors
app.get('/api/supervisors', async (req, res) => {
  try {
    const response = await axios.get('https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers');
    const data = response.data;

    const filtered = data
      .filter(manager => isNaN(manager.jurisdiction))
      .map(manager => ({
        label: `${manager.jurisdiction} - ${manager.lastName}, ${manager.firstName}`
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    res.json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch supervisors' });
  }
});

// POST /api/submit
app.post(
  '/api/submit',
  [
    body('firstName').isAlpha().withMessage('First name must contain only letters'),
    body('lastName').isAlpha().withMessage('Last name must contain only letters'),
    body('supervisor').notEmpty().withMessage('Supervisor is required'),
    body('email').optional().isEmail().withMessage('Invalid email'),
    body('phoneNumber').optional().isMobilePhone().withMessage('Invalid phone number'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log('New submission:', req.body);
    res.status(200).json({ message: 'Submission received successfully' });
  }
);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

