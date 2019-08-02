/**
 * Dependencies
 */
const winston = require('winston');
require('winston-mongodb');
const options = require('../config/log-transports');
/**
 * This lib prevents using the async.js middleware
 * that wraps route handlers in try/catch blocks
 */
require('express-async-errors');

/**
 * Logging and Error Handling
 */
logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.logs),
        new winston.transports.Console(options.console),
        new winston.transports.MongoDB(options.mongodb),
        new winston.transports.File(options.errors),
        new winston.transports.File(options.combined)
      ],
      exitOnError: false
});

/**
 * Create a stream object setting a stream
 * to be used by `morgan`
 */
logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
};

module.exports = logger;