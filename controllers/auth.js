const bcrypt = require('bcryptjs');

const validationManager = require('../utils/validationManager');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
    
    validationManager.provideValidation(req, next);

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    return res.status(201)
        .json({
            message: 'success',
        });
}

exports.login = async (req, res, next) => {
    validationManager.provideValidation(req);

    const user = await User.findByEmail(req.body.email);

    validationManager.provideModelCondition(user, 'Пользователь не найден');

    const isOnMatch = await bcrypt.compare(req.body.password, user.password);

    validationManager.provideAuthentication(isOnMatch, next);

    const token = validationManager.createUserToken(user);

    return res.json({
        token,
        userId: user.id,
    });
}