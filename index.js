/**
 * Dependencies
 */
const mongoose = require('mongoose');
const express = require('express');
const router = require('./routes/genres');

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
app.use('/api/genres', router);

/**
 * Listener
 */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));