/**
 * Dependencies
 */
const appRoot = require('app-root-path');

/**
 * Transports configuration
 */
module.exports = {
    logs: {
        level: 'debug',
        filename: `${appRoot}/logs/app.log`,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true
    },
    errors: {
        level: 'error',
        filename: `${appRoot}/logs/errors.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true
    },
    combined: {
        level: 'silly',
        filename: `${appRoot}/logs/combined.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true
    },
    console: {
        level: 'debug',
        handleExceptions: false,
        json: false,
        colorize: true,
    },
    mongodb: {
        level: 'error',
        db: 'mongodb://localhost/vidly',
        handleExceptions: true,
    }
}