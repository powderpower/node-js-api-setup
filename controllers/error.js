const logger = require('../utils/logger');

const ConfigService = require('../helpers/ConfigService');

const codes = require('../config/codes');

exports.throwNotFoud = (req, res) => {
    return res.status(codes.CODE_NOT_FOUND)
        .json({
            error: 'Page not found',
        });
};

exports.throwBadRequest = (req, res) => {
    return res.status(codes.CODE_BAD_REQUEST)
        .json({
            error: 'Access denied',
        });
};

exports.throwServerError = (err, req, res, next) => {
    const status    = err.statusCode || codes.CODE_INTERNAL_SERVER_ERROR;

    let message   = 'Internal server error';

    if (status == codes.CODE_INTERNAL_SERVER_ERROR) {
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
            data: err.data,
        });
}