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
 * GET
 */
/**
 * Explanation. The anonymous function is not called by you.
 * You are passing a function reference.
 * Express uses the reference and calls it at runtime and passes
 * the values req, res, next to the function.
 * 
 * This is considered called
 * (req, res, next) => {}(val, val2, val3)
 */
router.get('/anotherpath', (req, res, next) => {

});
// problem is, you care calling the asyncMiddleware function, and
// not passing a reference
router.get('/', asyncMiddleware(async (req, res, next) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
}));
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
router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send('Genre with provided ID not found');

    res.send(genre);
});

/**
 * Functions
 */
// This function has to return a route handler function that
// looks like (req, res, next)
// Acts like a factory
// Call it a function which returns a new function
// Returned function is a route handler which Express can call
// and pass req, res, next arguments to at runtime
async function asyncMiddleware(handler) { // handler is expected to be an async function
    // handler is a function (a route handler function so to speak :)
    try{
        await handler(req, res);
    } catch(ex) {
        next(ex);
    }
}

/**
 * Exports
 */
module.exports = router;