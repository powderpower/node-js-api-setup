const express       = require('express');
const bodyParser    = require('body-parser');

const ConfigService     = require('./helpers/ConfigService');
const PORT              = ConfigService.getPort();

const OutputManager = require('./helpers/OutputManager');

const midlleware        = require('./controllers/middleware');
const errorController   = require('./controllers/error');

const siteRoutes = require('./routes/site');

express()
    .use(bodyParser.json())
    .use(midlleware.provideCORS)
    .use(siteRoutes)
    .use(errorController.throwNotFoud)
    .use(errorController.throwInternalServerError)
    .listen(PORT,
        v => console.log(
                OutputManager.colorize('yellow'),
                `Server started at PORT ${PORT}`)
            );