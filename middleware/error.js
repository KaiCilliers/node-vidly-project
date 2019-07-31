/**
 * Dependencies
 */
const winston = require('winston');

/**
 * Function and Exports
 */
module.exports = function(err, req, res, next) {
    // syntax (logging level, message, optional err)
    // winston.log('error', err.message); // one way of doing it
    // winston.error(err.message);
    // passing metadata
    winston.error(err.message, err);
    res.status(500).send('Something failed');
}
/**
 * Logging levels available
 * 
 * error
 * warn
 * info
 * verbose
 * debug
 * silly
 */