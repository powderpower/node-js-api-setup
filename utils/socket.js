const socketIo      = require('socket.io');
const OutputManager = require('../helpers/OutputManager');

const ConfigService     = require('../helpers/ConfigService');
const PORT              = ConfigService.getSocketPort();

module.exports = {
    io: null,
    init: httpServer => {
        this.io = socketIo(httpServer);

        this.io.listen(PORT);

        OutputManager.showServerInit(PORT, 'Web socket');
        
        return this.io;
    },
    getIO: () => {
        if (! this.io) {
            throw new Error('Socket server is not defined');
        }

        return this.io;
    }
};