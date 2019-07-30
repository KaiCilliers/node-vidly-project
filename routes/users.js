/**
 * Dependencies
 */
const {Register, joiValidate} = require('../models/register');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/**
 * GET
 */
router.get('/', (req, res) => {
    res.send('Hello');
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
/**
 * DELETE
 */

/**
 * Exports
 */
module.exports = router;