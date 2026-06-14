const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const ratingController = require('../controllers/rating.controller');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

router.get('/recipe/:recipeId', optionalAuth, ratingController.getRatingsByRecipe);

router.post(
  '/recipe/:recipeId',
  authenticateToken,
  [
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
  ],
  validateRequest,
  ratingController.createRating
);

router.delete('/:id', authenticateToken, ratingController.deleteRating);

module.exports = router;
