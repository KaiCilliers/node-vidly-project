/**
 * Dependencies
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('../models/movie');

/**
 * GET
 */
router.get('/', (req, res) => {
    res.send('Good');
});
router.get('/:id', (req, res) => {
    res.send(req.params.id);
});

/**
 * POST
 */
router.post('/:id', (req, res) => {
    res.send(req.params.id);
});

/**
 * PUT
 */
router.put('/:id', (req, res) => {
    res.send(req.params.id);
});

/**
 * DELETE
 */
router.delete('/:id', (req, res) => {
    res.send(req.params.id);
});

/**
 * Exports
 */
module.exports = router;