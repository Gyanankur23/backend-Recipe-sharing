const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Rating = sequelize.define("Rating", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'recipes',
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
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
    timestamps: true,
    tableName: 'ratings',
    indexes: [
        {
            unique: true,
            fields: ['recipeId', 'userId']
        }
    ]
});

module.exports = Rating;
