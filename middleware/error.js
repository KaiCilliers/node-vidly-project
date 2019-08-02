/**
 * Dependencies
 */
require('winston-mongodb');
const logger = require('../startup/logging');

/**
 * Handle errors within Express context
 */
module.exports = function(err, req, res, next) {
    logger.error(err.message, { meta: err });
    res.status(500).send('[Router Handler] Something failed');
}