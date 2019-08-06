/**
 * Dependencies
 */
const logger = require('./startup/logging');
const express = require('express');
// require('winston-mongodb');

/**
 * Winston does not handle promise rejections outside Express
 * 
 * Throw an synchronous error for Winston to catch
 */
process.on('unhandledRejection', (ex) => {
  throw ex;
});

/**
 * Server Connection
 */
const app = express();

/**
 * Startup Code
 */
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

/**
 * Listener
 */
const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, () => logger.info(`Listening on port ${PORT}...`));

/**
 * Exports
 */
module.exports = server;