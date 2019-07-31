/**
 * Dependencies
 */
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');

/**
 * Server Connection
 */
const app = express();
// load first so that you can log any errors with loading rest of modules
require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

/**
 * Listener
 */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));