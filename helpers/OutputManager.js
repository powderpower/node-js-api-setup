const YELLOW_COLOUR_OUPUT   = "\x1b[33m";
const GREEN_COLOUR_OUPUT    = "\x1b[32m";

module.exports = class OutputManager
{
    /**
     * Цвета вывода в консоль.
     * 
     * @return { Object }
     */
    static colors()
    {
        return {
            green: GREEN_COLOUR_OUPUT,
        };
    }
    
    /**
     * Возвращает цвет вывода в консоль.
     * 
     * @param { String } color 
     */
    static colorize(color)
    {
        const colors = OutputManager.colors();
        
        if (typeof colors[color] == 'undefined') {
            return '';
        }

        return colors[color];
    }

    /**
     * Вывод в консоли информации
     * о запуске сервера.
     * 
     * @param {void} port
     * @param {string} item
     * @param {color} color
     */
    static showServerInit(port, item = 'Server', color = 'green')
    {
        return console.log(
                OutputManager.colorize(color),
                `${item} started at PORT ${port}`
            );
    }
}