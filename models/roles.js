const Sequelize = require('sequelize');
const sequelize = require('../database/setup');

const Roles = sequelize.define('roles', {
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
},
{
    indexes: [
        {
            unique: true,
            fields: ['name'],
        },
    ],
});

module.exports = Roles;