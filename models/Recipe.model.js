const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');


const Recipe = sequelize.define('Recipe', {
   id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true,
   },
   title:{
    type:DataTypes.CHAR,
    allowNull:false
   },
   content:{
    type:DataTypes.CHAR,
    allowNull:false
   }
});


module.exports = Recipe;