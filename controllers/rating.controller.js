const { Rating, User, Recipe } = require('../models');

const getRatingsByRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;

    const ratings = await Rating.findAll({
      where: { recipeId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
        },
      ],
    });

    const averageRating = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0;

    res.json({
      ratings,
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalRatings: ratings.length,
    });
  } catch (error) {
    next(error);
  }
};

const createRating = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const { rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const existingRating = await Rating.findOne({
      where: { recipeId, userId: req.user.id },
    });

    if (existingRating) {
      await existingRating.update({ rating });
      const updatedRating = await Rating.findByPk(existingRating.id, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'username'],
          },
        ],
      });
      return res.json({
        message: 'Rating updated successfully',
        rating: updatedRating,
      });
    }

    const newRating = await Rating.create({
      recipeId,
      userId: req.user.id,
      rating,
    });

    const createdRating = await Rating.findByPk(newRating.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
        },
      ],
    });

    res.status(201).json({
      message: 'Rating created successfully',
      rating: createdRating,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRating = async (req, res, next) => {
  try {
    const { id } = req.params;

    const rating = await Rating.findByPk(id);

    if (!rating) {
      return res.status(404).json({ error: 'Rating not found' });
    }

    if (rating.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this rating' });
    }

    await rating.destroy();

    res.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRatingsByRecipe,
  createRating,
  deleteRating,
};
