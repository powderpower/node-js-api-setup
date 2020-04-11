const express       = require('express');
const bodyParser    = require('body-parser');

const sequelize = require('./database/setup');
const relations = require('./database/relations');

const socketServer = require('./utils/socket');

const ConfigService     = require('./helpers/ConfigService');
const PORT              = ConfigService.getPort();

const OutputManager = require('./helpers/OutputManager');

const midlleware        = require('./middleware/kernel');
const errorController   = require('./controllers/error');

const siteRoutes = require('./routes/site');

async function initServer() {
    const app = await express()
        .use(bodyParser.json())
        .use(midlleware.provideCORS)
        .use(siteRoutes)
        .use(errorController.throwNotFoud)
        .use(errorController.throwServerError)
        .listen(PORT, v => OutputManager.showServerInit(PORT));

    socketServer.init(app);
};

relations.defineRelations();

return sequelize
    .sync({force: true})
    .then(initServer);

