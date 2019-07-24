/**
 * Dependencies
 */
const mongoose = require('mongoose');
const express = require('express');
const routerGenre = require('./routes/genres');
const routerCustomer = require('./routes/customers');

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
app.use('/api/genres', routerGenre); // if route is /api/genre then use routerGenre api
app.use('/api/customers', routerCustomer);

/**
 * Listener
 */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));