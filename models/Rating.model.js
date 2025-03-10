const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db"); 

const Rating = sequelize.define("Rating", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1, 
            max: 5  
        }
    }
}, {
    timestamps: true 
});

module.exports = Rating;
