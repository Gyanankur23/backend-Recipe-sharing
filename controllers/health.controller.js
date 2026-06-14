const { sequelize, User, Recipe, Comment, Rating } = require('../models');

const healthCheck = async (req, res, next) => {
  try {
    const dbStatus = await sequelize.authenticate();
    
    const stats = {
      users: await User.count(),
      recipes: await Recipe.count(),
      comments: await Comment.count(),
      ratings: await Rating.count(),
    };

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      environment: process.env.NODE_ENV || 'development',
      version: '2.0.0',
      statistics: stats,
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message,
    });
  }
};

const getStats = async (req, res, next) => {
  try {
    const stats = {
      users: await User.count(),
      recipes: await Recipe.count(),
      comments: await Comment.count(),
      ratings: await Rating.count(),
    };

    res.json({ statistics: stats });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  healthCheck,
  getStats,
};
