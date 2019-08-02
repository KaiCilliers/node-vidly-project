/**
 * Dependencies
 */
const {Rental, joiValidate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

/**
 * Initialisations
 * 
 * Fawn runs multiple database
 * operations to be executed.
 * If one operation fails, it will
 * rollback all other operations that
 * succeeded.
 * 
 * All database operations that Fawn
 * controls, either succeed or fail.
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
router.post('/', async (req, res) => {
    const { error } = joiValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

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
     * Two operations present in Fawn
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