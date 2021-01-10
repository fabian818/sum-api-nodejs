'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sum extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Sum.init({
        first_number: DataTypes.FLOAT,
        second_number: DataTypes.FLOAT,
        result: DataTypes.FLOAT,
        user_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Sum',
    });
    Sum.associate = (models) => {
        Sum.belongsTo(models.User, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        })
    }
    return Sum;
};
