/**
 * Dependencies
 */
const mongoose = require('mongoose');
const logger = require('../startup/logging');

// const logger = winston.createLogger({
//     transports: [
//         new winston.transports.File({ filename: 'logs.log' }),
//         new winston.transports.Console()
//       ]
// });

/**
 * Database Connection
 */
module.exports = function() {
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => logger.info('Connected to MongoDB...'));
        // catch is removed so that global error handler can catch an error
}