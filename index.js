/**
 * Dependencies
 */
const logger = require('./startup/logging');
const express = require('express');
require('winston-mongodb');

// winston does not handle rejected promises outside express
process.on('unhandledRejection', (ex) => {
  throw ex;
});

const p = Promise.reject(new Error('promise part message'));
p.then(() => console.log('Doneish'));
// throw new Error('startup FAIL');

/**
 * Server Connection
 */
const app = express();
// require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

/**
 * Listener
 */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => logger.info(`Listening on port ${PORT}...`));