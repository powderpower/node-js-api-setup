const { validationResult }  = require('express-validator');
const jwt                   = require('jsonwebtoken');
const { check }             = require('express-validator');

const commonConfig  = require('../config/_common');

const codes = require('../config/codes');

const User = require('../models/user');

/**
 * Минимальная длина поля name.
 * @const {integer}
 */
const NAME_MIN_INPUT_LENGTH = 5;

/**
 * Минимальная длина поля password.
 * @const {integer}
 */
const PASSWORD_MIN_INPUT_LENGTH = 5;

/**
 * Обработка валидации данных ввода.
 */
exports.provideValidation = (req, next) => {
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
        return true;
    }

    const error         = new Error('Данные не валидны');
    error.statusCode    = codes.CODE_BAD_REQUEST;
    error.data          = errors.array();

    throw error;
};

/**
 * Обработка наличия аутентификации.
 */
exports.provideAuthentication = (condition) => {
    if (condition) {
        return null;
    }

    const error         = new Error('Аутентификация не выполнена');
    error.statusCode    = codes.CODE_UNAUTHORIZED;

    return error;
}

/**
 * Обработка наличия аутентификации.
 */
exports.provideModelCondition = (condition, errorData = 'Запрашиваемый объект не найден') => {
    if (condition) {
        return true;
    }

    const error         = new Error(errorData);
    error.statusCode    = codes.CODE_NOT_FOUND;

    throw error;
}

/**
 * Создает токен для пользователя
 * 
 * @param { User } user модель пользователя
 * @return { string }
 */
exports.createUserToken = (user) => {
    console.log(commonConfig.TOKEN_SECRET_WORD);
    
    return jwt.sign(
        {
            email: user.email,
            userId: user.id,
        },
        commonConfig.TOKEN_SECRET_WORD,
        {
            expiresIn: commonConfig.TOKEN_EXPIRATION_TIME,
        }
    );
}

/**
 * Валидация поля email.
 */
exports.validateEmail = (checkUnique = true) => {
    const query = check('email')
        .isEmail()
        .withMessage('Проверьте правильность ввода почты.')

        if (! checkUnique) {
            return query;
        }
    
        query.custom(async (value, {req}) => {
            const existingUser = await User.findByEmail(value);
        
            if (existingUser) {
                throw new Error('Пользователь с такой почтой уже существует');
            }
        })
        .normalizeEmail();

    return query;
}

/**
 * Валидация поля name.
 */
exports.validateName = () => {
    return check('name')
        .isLength({min: NAME_MIN_INPUT_LENGTH})
        .withMessage(`Минимальное кол-во символов для имени: ${NAME_MIN_INPUT_LENGTH}`)
        .isAlphanumeric()
        .withMessage('Имя может содержать только буквы и цифры');
}

/**
 * Валидация поля password.
 */
exports.validatePassword = () => {
    return check('password')
        .isLength({min: PASSWORD_MIN_INPUT_LENGTH})
        .withMessage(`Минимальное кол-во символов для пароля: ${PASSWORD_MIN_INPUT_LENGTH} chars long`)
        .isAlphanumeric()
        .withMessage('Пароль может содержать только буквы и цифры')
        .trim();
}

/**
 * Валидация подтверждения пароля.
 */
exports.validatePasswordConfirmation = () => {
    return check('confirm_password')
        .custom((value, { req }) => {
            
            if (value == req.body.password) {
                return true;
            }

            throw new Error('Введенные пароли должны совпадать');
        })
        .trim();
}