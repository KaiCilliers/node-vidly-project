/**
 * Dependencies
 */
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');

/**
 * Server Connection
 */
const app = express();
require('./startup/routes')(app);

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
 * Listener
 */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));