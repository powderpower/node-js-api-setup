const Sequelize = require('sequelize');
const sequelize = require('../database/setup');

const UserRoles = sequelize.define('user_roles', {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        insigned: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
},
{
    uniqueKeys : [{
        singleField : false,
        fields      : ['role_id', 'user_id'],
    }],
}); 

module.exports = UserRoles;