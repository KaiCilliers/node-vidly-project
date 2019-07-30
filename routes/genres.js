/**
 * Dependencies
 */
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Genre, joiValidate} = require('../models/genre');

/**
 * router.get() syntax
 * 
 * router.get(
 *  the route,
 *  optional middleware,
 *  route handler
 * )
 */

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
router.post('/', auth, async (req, res) => {
    const { error } = joiValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
        name: req.body.name
    });
    
    await genre.save();
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
// executes auth middleware then admin middleware
// if both go through then function body will be executed
router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send('Genre with provided ID not found');

    res.send(genre);
});

/**
 * Exports
 */
module.exports = router;