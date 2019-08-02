/**
 * Dependencies
 */
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {User, joiValidate} = require('../models/user');

/**
 * GET
 */
router.get('/me', auth, async (req, res) => {
    /**
     * Client only sends a JWT. The request goes through
     * the middleware specified ('auth') that sets the 
     * user object which contains the user's ID.
     * 
     * The information is extracted from the JSON Web Token
     */
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

/**
 * POST
 */
router.post('/', async (req, res) => {
    const { error } = joiValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

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
    
    // Here is where you call the function added to the user schema
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(
        _.pick(user, ['_id', 'name', 'email'])
    );
});

/**
 * Exports
 */
module.exports = router;