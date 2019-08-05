/**
 * Dependencies
 */
const express = require('express');
const router = express.Router();
const moment = require('moment');
const {Rental} = require('../models/rental');
const {Movie} = require('../models/movie');
const auth = require('../middleware/auth');
const validateBody = require('../middleware/validate');
const Joi = require('@hapi/joi');

/**
 * POST
 */
router.post('/', [auth, validateBody(validateReturn)], async (req, res) => {
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) return res.status(404).send('Rental not found');
    
    if (rental.dateReturned) return res.status(400).send('rental already processed');

    // This domain logic needs to be in the rental object
    rental.return();
    await rental.save();

    await Movie.update({ _id: rental.movie._id }, {
        $inc: { numberInStock: 1 }
    });

    return res.send(rental);
});

function validateReturn(req) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()

    };
    return Joi.validate(req, schema);
}

/**
 * Exports
 */
module.exports = router;