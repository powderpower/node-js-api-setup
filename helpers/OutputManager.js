const GREEN_COLOUR_OUPUT = "\x1b[33m%s\x1b[0m";

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
            yellow: GREEN_COLOUR_OUPUT,
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
}