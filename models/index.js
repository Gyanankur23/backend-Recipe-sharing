const { sequelize } = require('../config/database');
const User = require('./User.model');
const Recipe = require('./Recipe.model');
const Comment = require('./Comment.model');
const Rating = require('./Rating.model');

// Define associations
User.hasMany(Recipe, { foreignKey: 'userId', as: 'recipes' });
Recipe.belongsTo(User, { foreignKey: 'userId', as: 'author' });

User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Recipe.hasMany(Comment, { foreignKey: 'recipeId', as: 'comments' });
Comment.belongsTo(Recipe, { foreignKey: 'recipeId', as: 'recipe' });

User.hasMany(Rating, { foreignKey: 'userId', as: 'ratings' });
Rating.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Recipe.hasMany(Rating, { foreignKey: 'recipeId', as: 'ratings' });
Rating.belongsTo(Recipe, { foreignKey: 'recipeId', as: 'recipe' });

module.exports = {
  sequelize,
  User,
  Recipe,
  Comment,
  Rating
};
