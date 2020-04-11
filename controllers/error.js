const logger = require('../utils/logger');

const ConfigService = require('../helpers/ConfigService');

const errors = require('../config/errors');

exports.throwNotFoud = (req, res) => {
    return res.status(errors.CODE_NOT_FOUND)
        .json({
            error: 'Page not found',
        });
};

exports.throwBadRequest = (req, res) => {
    return res.status(errors.CODE_BAD_REQUEST)
        .json({
            error: 'Access denied',
        });
};

exports.throwServerError = (err, req, res, next) => {
    const status    = err.statusCode || errors.CODE_INTERNAL_SERVER_ERROR;

    let message   = 'Internal server error';

    if (status == errors.CODE_INTERNAL_SERVER_ERROR) {
        logger.log('error', err.stack);
    }

    if (! ConfigService.isProduction()) {
        message = err.message;
    }

    if (! res.headersSent) {
        res.status(status);
    }
    
    return res.json({
            error: message,
        });
}