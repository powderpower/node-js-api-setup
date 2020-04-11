const config = require('../config/common');

module.exports = class ConfigService
{
    /**
     * Проверяет активность режима
     * продакшн.
     * 
     * @return {boolean}
     */
    static isProduction()
    {
        if (process.env.NODE_ENV === 'production') {
            return true;
        }

        return false;
    }
    
    /**
     * Возвращает порт запуска.
     * 
     * @return {BigInteger}
     */
    static getPort()
    {
        if (ConfigService.isProduction()) {
            return config.PROD_APP_PORT;
        }

        return config.DEV_APP_PORT;
    }

    /**
     * Возвращает порт
     * запуска веб-сокетов.
     * 
     * @return {BigInteger}
     */
    static getSocketPort()
    {
        return config.WEB_SOCKET_PORT;
    }
}