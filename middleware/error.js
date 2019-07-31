/**
 * Dependencies
 */
const winston = require('winston');

/**
 * Function and Exports
 * 
 * winston not working properly as it should at v5
 * downgraded to v3
 * 
 * winston had too many changes, streamline it later to your liking
 */
module.exports = function(err, req, res, next) {
    // syntax (logging level, message, optional err)
    // winston.log('error', err.message); // one way of doing it
    // winston.error(err.message);
    // passing metadata
    winston.error(err.message, err);
    res.status(500).send('Something failed v3');
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