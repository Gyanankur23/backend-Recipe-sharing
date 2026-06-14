const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Recipe = sequelize.define('Recipe', {
   id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true,
   },
   title: {
       type: DataTypes.STRING,
       allowNull: false,
       validate: {
           len: [1, 255]
       }
   },
   content: {
       type: DataTypes.TEXT,
       allowNull: false
   },
   userId: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
           model: 'users',
           key: 'id'
       }
   },
   imageUrl: {
       type: DataTypes.STRING,
       allowNull: true
   },
   category: {
       type: DataTypes.STRING,
       allowNull: true
   },
   cookingTime: {
       type: DataTypes.INTEGER,
       allowNull: true,
       comment: 'in minutes'
   },
   servings: {
       type: DataTypes.INTEGER,
       allowNull: true
   }
}, {
    timestamps: true,
    tableName: 'recipes'
});

module.exports = Recipe;