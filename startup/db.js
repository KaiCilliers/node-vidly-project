/**
 * Dependencies
 */
const mongoose = require('mongoose');
const winston = require('winston');

/**
 * Database Connection
 */
module.exports = function() {
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => winston.info('Connected to MongoDB...'));
}