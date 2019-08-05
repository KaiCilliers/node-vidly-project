/**
 * Dependencies
 */
const {createLogger, transports} = require('winston');
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
logger = createLogger({
    transports: [
        new transports.File(options.logs),
        new transports.Console(options.console),
        new transports.MongoDB(options.mongodb),
        new transports.File(options.errors),
        new transports.File(options.combined)
      ],
      exitOnError: true
});

/**
 * Create a stream object setting a stream
 * to be used by `morgan`
 */
logger.stream = {
    write: function(message, encoding) {
        logger.debug(message);
    }
};

module.exports = logger;