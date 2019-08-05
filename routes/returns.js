/**
 * Dependencies
 */
const express = require('express');
const router = express.Router();
const moment = require('moment');
const {Rental} = require('../models/rental');
const {Movie} = require('../models/movie');
const auth = require('../middleware/auth');
const Joi = require('@hapi/joi');

const validate = (validator) => {
    return (req, res, next) => {
        const { error } = validator(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        next();
    }
}

/**
 * POST
 */
router.post('/', [auth, validate(validateReturn)], async (req, res) => {
    // Access id in a sub document
    const rental = await Rental.findOne({
        'customer._id': req.body.customerId,
        'movie._id': req.body.movieId
    });
    if (!rental) return res.status(404).send('Rental not found');
    
    if (rental.dateReturned) return res.status(400).send('rental already processed');
    
    rental.dateReturned = new Date();
    const rentalDays = moment().diff(rental.dateOut, 'days');
    rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
    rental.save();

    await Movie.update({ _id: rental.movie._id }, {
        $inc: { numberInStock: 1 }
    });

    return res.status(200).send(rental);
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