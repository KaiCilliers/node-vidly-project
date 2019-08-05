/**
 * Dependencies
 */
const {Rental} = require('../../../models/rental');
const mongoose = require('mongoose');
const request = require('supertest');

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
     * TESTS (wrote test first)
     */
    it('should return 401 if client is not logged in', async () => {
        // { customerId, movieId } equals  { customerId: customerId, movieId: movieId }
        // You can use shorthand due to variable names being the same as field
        const res = await request(server)
            .post('/api/returns')
            .send({ customerId, movieId });
        expect(res.status).toBe(401);
    });
});