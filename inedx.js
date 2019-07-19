// Dependencies
const express = require('express');
const Joi = require('@hapi/joi');

// Server setup
const app = express();

// Middleware
//app.use(express.json());

// GET
app.get('/', (req, res) => {
    console.log('get req');
    res.send('get req');
});

// POST
app.post('/', (req, res) => {
    console.log('post req');
    res.send('post req');
});

// PUT
app.put('/', (req, res) => {
    console.log('put req');
    res.send('put req');
});

// DELETE
app.delete('/', (req, res) => {
    console.log('delete req');
    res.send('delete req');
});

// Functions

// Listener
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));