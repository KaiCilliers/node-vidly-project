/**
 * Dependencies
 */
const express = require('express');
const Joi = require('@hapi/joi');
const router = require('./routes/genres');

/**
 * Server
 */
const app = express();

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