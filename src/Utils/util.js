const winston = require('winston');

class Logger {
    constructor(level = 'info', environment = 'production') {
        this.logger = winston.createLogger({
            level: level,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.errors({ stack: true }),
                winston.format.splat(),
                winston.format.json(),
                winston.format.colorize({
                    colors: {
                        error: 'red',
                        warn: 'yellow',
                        info: 'green',
                        debug: 'blue'
                    }
                }),
                winston.format.printf((info) => {
                    const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
                    return `[${timestamp}] [${info.level}] [${info.environment}] ${info.message}`;
                })
            ),
            defaultMeta: { environment: environment },
            transports: [
                new winston.transports.Console()
            ]
        });
    }

    debug(message, meta) {
        this.logger.debug(message, meta);
    }

    info(message, meta) {
        this.logger.info(message, meta);
    }

    warn(message, meta) {
        this.logger.warn(message, meta);
    }

    error(message, meta) {
        this.logger.error(message, meta);
    }
}

module.exports = { Logger };