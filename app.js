const express       = require('express');
const bodyParser    = require('body-parser');

const sequelize = require('./database/setup');
const relations = require('./database/relations');

const ConfigService     = require('./helpers/ConfigService');
const PORT              = ConfigService.getPort();

const OutputManager = require('./helpers/OutputManager');

const midlleware        = require('./controllers/middleware');
const errorController   = require('./controllers/error');

const siteRoutes = require('./routes/site');

function initServer() {
    express()
        .use(bodyParser.json())
        .use(midlleware.provideCORS)
        .use(siteRoutes)
        .use(errorController.throwNotFoud)
        .use(errorController.throwInternalServerError)
        .listen(PORT, v => OutputManager.showServerInit(PORT));
};

relations.defineRelations();

return sequelize
    .sync({force: true})
    .then(initServer);

