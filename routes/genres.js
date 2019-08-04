/**
 * Dependencies
 */
const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const {Genre, joiValidate} = require('../models/genre');

/**
 * GET
 */
router.get('/', async (req, res, next) => {
    // throw new Error('custom error: Can not find Genre.');
    const genres = await Genre.find().sort('name');
    res.send(genres);
});
router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    
    if(!genre) return res.status(404).send('Genre with provided ID not found');

    res.send(genre);
});

/**
 * POST
 */
    // Another test - if user is not logger in, respond with 401 error - unauthorised
router.post('/', auth, async (req, res) => {
    const { error } = joiValidate(req.body);
    // Execution Path 1 - return 400 error
    if(error) return res.status(400).send(error.details[0].message);

    // Execution Path 2
    const genre = new Genre({
        name: req.body.name
    });
        // Path 1 - make sure genre is saved in the database
    await genre.save();
        // Part 2 - make sure the genre is in the body of the response
    res.send(genre);
});

/**
 * PUT
 */
router.put('/:id', async (req, res) => {
    const { error } = joiValidate(req.body)
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
router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send('Genre with provided ID not found');

    res.send(genre);
});

/**
 * Exports
 */
module.exports = router;