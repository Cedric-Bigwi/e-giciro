const express = require('express');
const { register, login, me } = require('../controllers/authController');
const { validate } = require('../middleware/validation');
const { registerSchema, loginSchema } = require('../utils/validationSchemas');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', authenticate, me);

module.exports = router;
