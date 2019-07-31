/**
 * Dependencies
 */
const winston = require('winston');
const express = require('express');

/**
 * Server Connection
 */
const app = express();
require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

/**
 * Listener
 */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => winston.info(`Listening on port ${PORT}...`));