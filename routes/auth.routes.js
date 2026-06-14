const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');
const { authRateLimiter } = require('../middleware/security');

router.post(
  '/register',
  authRateLimiter,
  [
    body('username')
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage('Username must be between 3 and 50 characters'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('email')
      .optional()
      .isEmail()
      .withMessage('Invalid email address'),
  ],
  validateRequest,
  authController.register
);

router.post(
  '/login',
  authRateLimiter,
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  authController.login
);

router.get('/profile', authenticateToken, authController.getProfile);

module.exports = router;
