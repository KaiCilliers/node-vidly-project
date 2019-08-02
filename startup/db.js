/**
 * Dependencies
 */
const mongoose = require('mongoose');
const logger = require('../startup/logging');

/**
 * Start Database Connection
 */
module.exports = function() {
    mongoose.connect('mongodb://localhost:27017/vidly', { useNewUrlParser: true })
        .then(() => logger.info('Connected to MongoDB...'));
}