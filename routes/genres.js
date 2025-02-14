/**
 * Dependencies
 */
const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const validateBody = require('../middleware/validate');
const express = require('express');
const router = express.Router();
const {Genre, joiValidate} = require('../models/genre');

/**
 * GET
 */
router.get('/', async (req, res, next) => {
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
router.post('/', [auth, validateBody(joiValidate)], async (req, res) => {
    const genre = new Genre({
        name: req.body.name
    });
    await genre.save();
    
    res.send(genre);
});

/**
 * PUT
 */
router.put('/:id', [auth, validateObjectId, validateBody(joiValidate)], async (req, res) => {
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true });

    if(!genre) return res.status(404).send('Genre with provided ID not found');

    res.send(genre);
});

/**
 * DELETE
 */
router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send('Genre with provided ID not found');

    res.send(genre);
});

/**
 * Exports
 */
module.exports = router;