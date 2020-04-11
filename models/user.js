const Sequelize = require('sequelize');
const sequelize = require('../database/setup');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false,
    }, 
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(11),
        allowNull: false,
    },
    status: {
        type: Sequelize.INTEGER(1).UNSIGNED,
        allowNull: false,
        defaultValue: '1',
    }
},
{
    indexes: [
        {
            unique: true,
            fields: ['email'],
        }
    ],
});

module.exports = User;