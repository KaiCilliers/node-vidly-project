/**
 * Dependencies
 */
const config = require('config');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');

/**
 * Server Connection
 */
const app = express();
require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();

/**
 * Environment Varaibles Setup
 */
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

/**
 * Listener
 */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));