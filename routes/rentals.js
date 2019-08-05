/**
 * Dependencies
 */
const {Rental, joiValidate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const validateBody = require('../middleware/validate');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

/**
 * Initialisations
 * 
 * Fawn allows multiple database
 * operations to be executed.
 * If one operation fails, it will
 * rollback all other operations that
 * succeeded.
 */
Fawn.init(mongoose);

/**
 * GET
 */
router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

/**
 * POST
 */
router.post('/', validateBody(joiValidate), async (req, res) => {
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not available.')

    let rental = new Rental({
        customer: {
            _id: customer.id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie.id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    /**
     * FAWN
     * 
     * Save to rental collection and
     * Update movie collection
     */
    try {
        new Fawn.Task().save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();
    
        res.send(rental);
    } catch (ex) {
        res.status(500).send('Rental creation failed.');
    }
});


/**
 * Exports
 */
module.exports = router;