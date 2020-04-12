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
const authRoutes = require('./routes/auth');

async function initServer() {
    const app = await express()
        .use(bodyParser.json())
        .use((req, res, next) => {
            console.log(req.path);
            next();
        })
        .use(midlleware.provideCORS)
        .use(siteRoutes)
        .use('/auth', authRoutes)
        .use(errorController.throwServerError)
        .use(errorController.throwNotFoud)
        .listen(PORT, v => OutputManager.showServerInit(PORT));

    socketServer.init(app);
};

relations.defineRelations();

return sequelize
    .sync(/*{force: true}*/)
    .then(initServer);

