/**
 * Dependencies
 */
const {Rental} = require('../../../models/rental');
const {User} = require('../../../models/user');
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
    let token

    /**
     * Main Body for happy path
     */
    // CTRL + SHIFT + O
    const exec = async () => {
        return await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId, movieId });
    };

    /**
     * Setup and cleanup
     */
    beforeEach(async () => {
        server = require('../../../index');

        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        token = new User().generateAuthToken();

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
        await server.close(); // important to await this promise
    });

    /**
     * TESTS (wrote test first)
     */
    // AUTH
    it('should return 401 if client is not logged in', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });
    it('should return 400 if customerId is not provided', async () => {
        customerId = '';
        const res = await exec();
        expect(res.status).toBe(400);
    });
    it('should return 400 if movieId is not provided', async () => {
        movieId = '';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    // VALIDATION
    it('should return 404 if no rental found for the customer/movie', async () => {
        // Delete all values in collection
        await Rental.remove({});
        const res = await exec();
        expect(res.status).toBe(404);
    });
    it('should return 400 if return is already processed', async () => {
        rental.dateReturned = new Date();
        await rental.save();
        const res = await exec();
        expect(res.status).toBe(400);
    });
    it('should return 200 if request is valid', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });

    // RESPONSE
    it('should set the returnDate if input is valid', async () => {
        const res = await exec();

        /**
         * We are not using rental object,
         * it is in memory.
         * 
         * When call exec() we make changes
         * to DB, and rental is not aware of
         * changes.
         */
        const rentalInDb = await Rental.findById(rental._id);

        expect(rentalInDb.dateReturned).toBeDefined();
    });
});