const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const commentController = require('../controllers/comment.controller');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

router.get('/recipe/:recipeId', optionalAuth, commentController.getCommentsByRecipe);

router.post(
  '/recipe/:recipeId',
  authenticateToken,
  [
    body('text')
      .trim()
      .notEmpty()
      .withMessage('Comment text is required')
      .isLength({ max: 2000 })
      .withMessage('Comment must be less than 2000 characters'),
  ],
  validateRequest,
  commentController.createComment
);

router.put(
  '/:id',
  authenticateToken,
  [
    body('text')
      .trim()
      .notEmpty()
      .withMessage('Comment text is required')
      .isLength({ max: 2000 })
      .withMessage('Comment must be less than 2000 characters'),
  ],
  validateRequest,
  commentController.updateComment
);

router.delete('/:id', authenticateToken, commentController.deleteComment);

module.exports = router;
