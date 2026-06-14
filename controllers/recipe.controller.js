const { Recipe, User, Rating, Comment } = require('../models');

const getAllRecipes = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (category) where.category = category;
    if (search) {
      where[require('sequelize').Op.or] = [
        { title: { [require('sequelize').Op.like]: `%${search}%` } },
        { content: { [require('sequelize').Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows: recipes } = await Recipe.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username'],
        },
        {
          model: Rating,
          as: 'ratings',
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      recipes,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findByPk(id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username'],
        },
        {
          model: Comment,
          as: 'comments',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'username'],
            },
          ],
        },
        {
          model: Rating,
          as: 'ratings',
        },
      ],
    });

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json({ recipe });
  } catch (error) {
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  try {
    const { title, content, imageUrl, category, cookingTime, servings } = req.body;

    const recipe = await Recipe.create({
      title,
      content,
      userId: req.user.id,
      imageUrl,
      category,
      cookingTime,
      servings,
    });

    const createdRecipe = await Recipe.findByPk(recipe.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username'],
        },
      ],
    });

    res.status(201).json({
      message: 'Recipe created successfully',
      recipe: createdRecipe,
    });
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, imageUrl, category, cookingTime, servings } = req.body;

    const recipe = await Recipe.findByPk(id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    if (recipe.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this recipe' });
    }

    await recipe.update({
      title,
      content,
      imageUrl,
      category,
      cookingTime,
      servings,
    });

    const updatedRecipe = await Recipe.findByPk(id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username'],
        },
      ],
    });

    res.json({
      message: 'Recipe updated successfully',
      recipe: updatedRecipe,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findByPk(id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    if (recipe.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this recipe' });
    }

    await recipe.destroy();

    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
