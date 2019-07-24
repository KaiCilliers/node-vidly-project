/**
 * Dependencies
 */
const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();
const mongoose = require('mongoose');

/**
 * Models with Schemas
 */
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

/**
 * GET
 */
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    
    if(!genre) return res.status(404).send('Genre with provided ID not found');

    res.send(genre);
});

/**
 * POST
 */
router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Using let because when saving, the ID will be sent to us and we want to reset genre with the ID attribute
    let genre = new Genre({
        name: req.body.name
    });
    
    let = await genre.save();

    res.send(genre);

});

/**
 * PUT
 */
router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true });

    if(!genre) return res.status(404).send('Genre with provided ID not found');

    res.send(genre);
});

/**
 * DELETE
 */
router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send('Genre with provided ID not found');

    res.send(genre);
});

/**
 * Functions
 */
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(4).required()
    };
    return Joi.validate(genre, schema);
}

/**
 * Exports
 */
module.exports = router;