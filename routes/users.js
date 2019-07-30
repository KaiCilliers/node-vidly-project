/**
 * Dependencies
 */
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User, joiValidate} = require('../models/user');

/**
 * GET
 */
router.get('/me', auth, async (req, res) => {
    // comes from the token that was decoded
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

/**
 * POST
 */
router.post('/', async (req, res) => {
    const { error } = joiValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Make sure the user doens't exist already
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(
        _.pick(req.body,[
            'name', 'email', 'password'
        ])
    );

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    
    const token = user.generateAuthToken();
    // headers always start with 'x-'
    res.header('x-auth-token', token).send(
        _.pick(user, ['_id', 'name', 'email'])
    );
});

/**
 * Exports
 */
module.exports = router;