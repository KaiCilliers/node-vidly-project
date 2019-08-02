/**
 * Dependencies
 */
const appRoot = require('app-root-path');
const {format} = require('winston');
const {combine, timestamp, label, printf} = format;

const printFormat = printf(({ level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

/**
 * Transports configuration
 */
module.exports = {
    logs: {
        level: 'debug',
        filename: `${appRoot}/logs/app.log`,
        format: combine(
            label({ label: 'App'}),
            timestamp(),
            printFormat
        ),
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true
    },
    errors: {
        level: 'error',
        filename: `${appRoot}/logs/errors.log`,
        format: combine(
            label({ label: 'App'}),
            timestamp(),
            printFormat
        ),
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true
    },
    combined: {
        level: 'silly',
        filename: `${appRoot}/logs/combined.log`,
        format: combine(
            label({ label: 'App'}),
            timestamp(),
            printFormat
        ),
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true
    },
    console: {
        level: 'debug',
        format: combine(
            label({ label: 'App'}),
            timestamp(),
            printFormat
        ),
        handleExceptions: false,
        json: false,
        colorize: true,
    },
    mongodb: {
        level: 'error',
        format: combine(
            label({ label: 'App'}),
            printFormat
        ),
        db: 'mongodb://localhost/vidly',
        handleExceptions: true,
    }
}