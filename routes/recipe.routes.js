const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const recipeController = require('../controllers/recipe.controller');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

router.get('/', optionalAuth, recipeController.getAllRecipes);
router.get('/:id', optionalAuth, recipeController.getRecipeById);

router.post(
  '/',
  authenticateToken,
  [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 255 })
      .withMessage('Title must be less than 255 characters'),
    body('content')
      .trim()
      .notEmpty()
      .withMessage('Content is required'),
    body('imageUrl').optional().isURL().withMessage('Invalid image URL'),
    body('category').optional().trim(),
    body('cookingTime')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Cooking time must be a positive integer'),
    body('servings')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Servings must be a positive integer'),
  ],
  validateRequest,
  recipeController.createRecipe
);

router.put(
  '/:id',
  authenticateToken,
  [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().trim().notEmpty().withMessage('Content cannot be empty'),
    body('imageUrl').optional().isURL().withMessage('Invalid image URL'),
    body('category').optional().trim(),
    body('cookingTime')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Cooking time must be a positive integer'),
    body('servings')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Servings must be a positive integer'),
  ],
  validateRequest,
  recipeController.updateRecipe
);

router.delete('/:id', authenticateToken, recipeController.deleteRecipe);

module.exports = router;
