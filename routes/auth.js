/**
 * Dependencies
 */
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const {User} = require('../models/user');

/**
 * POST
 * 
 * Logging in user logic
 * User has to be logged out on the client, because
 * the authentication token should not be stored in
 * the database.
 */
router.post('/', async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);
});

/**
 * Functions
 * 
 * Validate data provided by client
 */
function validateLogin(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req, schema);
}

/**
 * Exports
 */
module.exports = router;