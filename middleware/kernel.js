const jwt = require('jsonwebtoken');

const User = require('../models/user');

const commonConfig  = require('../config/_common');
const errors        = require('../config/codes');

const validationManager = require('../utils/validationManager');

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

    validationManager.provideAuthentication(authHeader, next);
    
    let decodedToken;

    try {
        const token = authHeader.split(' ')[1];

        decodedToken = jwt.verify(token, commonConfig.TOKEN_SECRET_WORD);
    } catch (err) {
        err.statusCode = errors.CODE_INTERNAL_SERVER_ERROR;
        
        return next(err);
    }

    validationManager.provideAuthentication(decodedToken, next);

    const user = await User.findByPk(decodedToken.userId);

    validationManager.provideModelCondition(user);

    req.user = user;
    
    return next();
};