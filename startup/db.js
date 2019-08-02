/**
 * Dependencies
 */
const mongoose = require('mongoose');
const logger = require('../startup/logging');

/**
 * Start Database Connection
 */
module.exports = function() {
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => logger.info('Connected to MongoDB...'));
}