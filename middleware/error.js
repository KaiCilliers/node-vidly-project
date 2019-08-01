/**
 * Dependencies
 */
const winston = require('winston');
require('winston-mongodb');
const logger = require('../startup/logging');

// const logger = winston.createLogger({
//     transports: [
//         new winston.transports.File({ filename: `${appRoot}/logs/errors.log` }),
//         new winston.transports.MongoDB({
//             db: 'mongodb://localhost/vidly',
//             level: 'error'
//         })
//     ],
//       exitOnError: false, // do not exit on handled exceptions
// });

/**
 * Function and Exports
 */
// only logs route handlers
// only works within Express
// Does not work when an error is thrown outside the context of Express
module.exports = function(err, req, res, next) {
    // TODO saves message as as json. Unable to retrieve message argument
    logger.error(err.message, { meta: err });
    logger.info('TESTER', { meta: err });
    res.status(500).send('@Something failed');
}