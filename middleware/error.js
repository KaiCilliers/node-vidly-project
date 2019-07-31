/**
 * Dependencies
 */
const winston = require('winston');

/**
 * Function and Exports
 */
// only logs route handlers
// only works within Express
// Does not work when an error is thrown outside the context of Express
module.exports = function(err, req, res, next) {
    winston.error(err.message, err);
    res.status(500).send('Something failed');
}