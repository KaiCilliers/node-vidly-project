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
app.put('/genres/:id', (req, res) => {
    const genreObj = myGenres.find(item => item.id === parseInt(req.params.id));
    if(!genreObj) return res.status(404).send('Genre with provided ID not found');

    const { error } = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    genreObj.genre = req.body.genre;

    res.send(genreObj);
});

// DELETE
app.delete('/genres/:id', (req, res) => {
    const genreObj = myGenres.find(item => item.id === parseInt(req.params.id));
    if(!genreObj) return res.status(404).send('Genre with provided ID not found');

    const index = myGenres.indexOf(genreObj);
    myGenres.splice(index, 1);
    res.send(genreObj);
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