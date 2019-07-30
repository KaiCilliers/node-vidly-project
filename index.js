/**
 * Dependencies
 */
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
 * Set environment variables
 */
if (!config.get('jwtPrivateKey')) {
    // Throw fatal above is not defined (key not set/defined)
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    // 0 is success, anything else is not
    process.exit(1);
}

/**
 * Server and database connection
 */
const app = express();
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

/**
 * Listener
 */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));