/**
 * Dependencies
 */
const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();

/**
 * Data
 */
var myGenres = [
    { id: 1, genre: 'romance' },
    { id: 2, genre: 'adventure' },
    { id: 3, genre: 'comedy' },
    { id: 4, genre: 'anime' },
    { id: 5, genre: 'drama' }
];

/**
 * GET
 */
router.get('/', (req, res) => {
    res.send(myGenres);
});
router.get('/:id', (req, res) => {
    const genre = myGenres.find(item => item.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Genre with provided ID not found');

    res.send(genre);
});

/**
 * POST
 */
router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: myGenres.length + 1,
        genre: req.body.genre
    };

    myGenres.push(genre);
    res.send(genre);

});

/**
 * PUT
 */
router.put('/:id', (req, res) => {
    const genreObj = myGenres.find(item => item.id === parseInt(req.params.id));
    if(!genreObj) return res.status(404).send('Genre with provided ID not found');

    const { error } = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    genreObj.genre = req.body.genre;
    res.send(genreObj);
});

/**
 * DELETE
 */
router.delete('/:id', (req, res) => {
    const genreObj = myGenres.find(item => item.id === parseInt(req.params.id));
    if(!genreObj) return res.status(404).send('Genre with provided ID not found');

    const index = myGenres.indexOf(genreObj);
    myGenres.splice(index, 1);

    res.send(genreObj);
});

/**
 * Functions
 */
function validateGenre(genre) {
    const schema = {
        genre: Joi.string().min(4).required()
    };
    return Joi.validate(genre, schema);
}

/**
 * Exports
 */
module.exports = router;