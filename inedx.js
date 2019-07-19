// Dependencies
const express = require('express');
const Joi = require('@hapi/joi');

// Server setup
const app = express();

// Middleware
// you need this to be able to return json objects
app.use(express.json());

// Data
var myGenres = [
    { id: 1, genre: 'romance' },
    { id: 2, genre: 'adventure' },
    { id: 3, genre: 'comedy' },
    { id: 4, genre: 'anime' },
    { id: 5, genre: 'drama' }
];

// Middleware
//app.use(express.json());

// GET
app.get('/genres', (req, res) => {
    res.send(myGenres);
});

// POST
app.post('/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: myGenres.length + 1,
        genre: req.body.genre
    };
    myGenres.push(genre);

    res.send(genre);

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
function validateGenre(genre) {
    const schema = {
        genre: Joi.string().min(4).required()
    };
    return Joi.validate(genre, schema);
}

// Listener
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));