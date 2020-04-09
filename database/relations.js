const User      = require('../models/user');
const Roles     = require('../models/roles');
const UserRoles = require('../models/user_roles');

exports.defineRelations = () => {
    Roles.belongsToMany(User, { through: UserRoles });
    User.belongsToMany(Roles, { through: UserRoles });

    return true;
}