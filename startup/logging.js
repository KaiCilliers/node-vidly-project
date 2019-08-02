/**
 * Dependencies
 */
const winston = require('winston');
const appRoot = require('app-root-path');
require('winston-mongodb');
/**
 * This lib prevents using the async.js middleware
 * that wraps route handlers in try/catch blocks
 */
require('express-async-errors');

/**
 * Logging and Error Handling
 */
/**
 * Check to see if you can split up each to its own
 * transport variable
 * 
 * also incorporate an options object to pass
 * something like this:::::::
 * 
 * var options = {
    file: {
      level: 'info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
      ],
      exitOnError: false, // do not exit on handled exceptions
});
 */
logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: `${appRoot}/logs/logs.log` }),
        new winston.transports.Console({
          level: 'debug'
        }),
        new winston.transports.MongoDB({
          db: 'mongodb://localhost/vidly',
          level: 'error',
          handleExceptions: true
        }),
        new winston.transports.File({
            filename: `${appRoot}/logs/errors.log`,
            level: 'error',
            handleExceptions: true
        }),
        new winston.transports.File({
            filename: `${appRoot}/logs/combined.log`,
            level: 'silly',
            handleExceptions: true
        })
      ]
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    }
};

/**
 * Wine note
 * 
 * i think i solved this shit
 * end point success logs
 * end point fails logs (also in DB)
 * rejected promises outside express (also in DB)
 * uncaught exception outside express (also in DB)
 * random info logging (db connection and port listening etc...)
 * 
 * made a combined log file for everything
 * also moved all log files to log folder
 * added log folder to gitignore
 * 
 * there might be somewhere where i create an uncaughtexception.log file created....Hmmmmm weird
 */
module.exports = logger;