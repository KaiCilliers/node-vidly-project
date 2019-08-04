/**
 * Dependencies
 */
const mongoose = require('mongoose');
const logger = require('../startup/logging');
const config = require('config');

/**
 * Start Database Connection
 */
module.exports = function() {
    const db = config.get('db');
    mongoose.connect(db, { useNewUrlParser: true })
        .then(() => logger.info(`Connected to ${db}...`));
}