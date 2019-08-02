/**
 * Dependencies
 */
const express = require('express');
const morgan = require('morgan');
const logger = require('./logging');
const error = require('../middleware/error');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');

/**
 * Setup Middleware
 */
module.exports = function(app) {
    app.use(express.json());
    app.use(morgan('combined', { stream: logger.stream }));
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
}