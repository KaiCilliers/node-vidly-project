/**
 * Dependencies
 */
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const routerGenre = require('./routes/genres');
const routerCustomer = require('./routes/customers');
const routerMovie = require('./routes/movies');
const routerRental = require('./routes/rentals');
const routerUser = require('./routes/users');
const routerAuth = require('./routes/auth');

/**
 * Server Connection
 */
const app = express();

/**
 * Error handling
 */
winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
process.on('unhandledRejection', (ex) => {
    throw ex; // winston will catch this as sync code
});

/**
 * Logging Setup
 */
winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({
    db: 'mongodb://localhost/vidly',
    level: 'info'
}));

const p = Promise.reject(new Error('FAILED badly'));
p.then(() => console.log('Done'));

/**
 * Environment Varaibles Setup
 */
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

/**
 * Database Connection
 */
mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

/**
 * Middleware
 */
app.use(express.json());
app.use('/api/genres', routerGenre);
app.use('/api/customers', routerCustomer);
app.use('/api/movies', routerMovie);
app.use('/api/rentals', routerRental);
app.use('/api/users', routerUser);
app.use('/api/auth', routerAuth);
app.use(error);

/**
 * Listener
 */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));