/**
 * Dependencies
 */
const express = require('express');
const router = express.Router();
const {Rental} = require('../models/rental');
const auth = require('../middleware/auth');

/**
 * POST
 * 
 * Now, what is the simplest code to write
 * to make our test we created pass?
 */
router.post('/', auth, async (req, res) => {
    if (!req.body.customerId) return res.status(400).send('customerId not provided');
    if (!req.body.movieId) return res.status(400).send('movieId not provided');
    const rental = await Rental.find({
        customerId: req.body.customerId,
        movieId: req.body.movieId
    });
    console.log('rental = ' + rental);
    if (!rental._id) return res.status(404).send('rental with movie/customer id not found');
});

/**
 * Exports
 */
module.exports = router;