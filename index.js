/**
 * Dependencies
 */
const logger = require('./startup/logging');
const express = require('express');
require('winston-mongodb');

/**
 * Winston does not handle promise rejections outside Express
 * 
 * Throw an synchronous error for Winston to catch
 */
process.on('unhandledRejection', (ex) => {
  throw ex;
});

/**
 * Testing error catching
 */
// const p = Promise.reject(new Error('promise part message'));
// p.then(() => console.log('Doneish'));
// throw new Error('startup FAIL');

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

/**
 * Listener
 */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => logger.info(`Listening on port ${PORT}...`));