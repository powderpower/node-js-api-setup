const jwt = require('jsonwebtoken');

const User = require('../models/user');

const commonConfig  = require('../config/_common');
const errors        = require('../config/errors');

/**
 * Добавление возможности создания
 * кросс-доменных запросов к приложению.
 */
exports.provideCORS = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};

/**
 * Фильтрация доступа только
 * авторизованных пользователей.
 */
exports.authOnly = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (! authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = errors.CODE_UNAUTHORIZED;

        return next(error);
    }
    
    let decodedToken;

    try {
        const token = authHeader.split(' ')[1];

        decodedToken = jwt.verify(token, commonConfig.TOKEN_SECRET_WORD);
    } catch (err) {
        err.statusCode = errors.CODE_INTERNAL_SERVER_ERROR;
        
        return next(err);
    }

    if (! decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = errors.CODE_UNAUTHORIZED;

        return next(error);
    }

    const user = await User.findByPk(decodedToken.userId);

    if (! user) {
        const error = new Error('User not found.');
        error.statusCode = errors.CODE_NOT_FOUND;

        return next(error);
    }

    req.user = user;
    
    return next();
};