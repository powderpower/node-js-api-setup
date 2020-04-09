const logger = require('../utils/logger');

exports.throwNotFoud = (req, res) => {
    return res.status(404)
        .json({
            error: 'Page not found',
        });
};

exports.throwBadRequest = (req, res) => {
    return res.status(400)
        .json({
            error: 'Access denied',
        });
};

exports.throwInternalServerError = (err, req, res, next) => {
    logger.log('error', err.stack);
    
    return res.status(500)
        .json({
            error: 'Internal server error',
        });
}