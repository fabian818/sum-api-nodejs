'use strict';
const bcrypt = require('bcrypt');
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    User.beforeSave((user, options) => {
        if (user.changed('password')) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        }
    });
    User.prototype.isValidPassword = async function (password) {
        console.log('in is valid password');
        const user = this;
        const compare = await bcrypt.compare(password, user.password)
        console.log('compare', compare);
        return compare;
    };
    return User;
};
