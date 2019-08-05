/**
 * Dependencies
 */
const {Rental} = require('../../../models/rental');
const mongoose = require('mongoose');

/**
 * Globals
 */
let server;

/**
 * Test Suite
 */
describe('/api/returns', () => {
    /**
     * Local Globals
     */
    let customerId;
    let movieId;
    let rental;

    /**
     * Setup and cleanup
     */
    beforeEach(async () => {
        server = require('../../../index');

        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            }
        });
        await rental.save();
    });
    afterAll(async () => {
        await Rental.remove({});
        await server.close();
    });

    /**
     * TESTS
     */
    it('should work!', async () => {
        const result = await Rental.findById(rental._id);
        expect(result).not.toBeNull();
    });
});