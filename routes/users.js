/**
 * Dependencies
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User, joiValidate} = require('../models/user');

/**
 * POST
 */
router.post('/', async (req, res) => {
    const { error } = joiValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Make sure the user doens't exist already
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    await user.save();
    res.send(user);
});

/**
 * Exports
 */
module.exports = router;