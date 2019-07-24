/**
 * Dependencies
 */
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

/**
 * GET
 */
router.get('/', (req, res) => {
    res.send('working');
});
router.get('/:id', (req, res) => {
    res.send(req.params.id);
});

/**
 * POST
 */
router.post('/', (req, res) => {
    res.send(req.body);
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