/**
 * Dependencies
 */
const {Rental} = require('../../../models/rental');
const {User} = require('../../../models/user');
const {Movie} = require('../../../models/movie');
const mongoose = require('mongoose');
const request = require('supertest');
const moment = require('moment');

/**
 * Globals
 */
let server;

/**
 * Test Suite
 */
describe('/api/returns', () => {
    /**
     * Locals
     */
    let customerId;
    let movieId;
    let rental;
    let token
    let movie;
    let dailyRentalRate;

    /**
     * Main Body for happy path
     */
    const exec = async () => {
        return await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId, movieId });
    };

    /**
     * Setup & Cleanup
     */
    beforeEach(async () => {
        server = require('../../../index');

        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        token = new User().generateAuthToken();
        dailyRentalRate = 2;

        movie = new Movie({
            _id: movieId,
            title: '12345',
            dailyRentalRate: dailyRentalRate,
            genre: { name: '12345' },
            numberInStock: 20
        });
        await movie.save();

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: dailyRentalRate
            }
        });
        await rental.save();
    });
    afterEach(async () => {
        await Rental.remove({});
        await Movie.remove({});
        await server.close();
    });

    /**
     * TESTS
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

        const rentalInDb = await Rental.findById(rental._id);
        const diff = new Date() - rentalInDb.dateReturned;

        expect(diff).toBeLessThan(10 * 1000);
    });
    it('should set the rentalFee if input is valid', async () => {
        rental.dateOut = moment().add(-7, 'days').toDate();
        await rental.save()

        const res = await exec();

        const rentalInDb = await Rental.findById(rental._id);
        expect(rentalInDb.rentalFee).toBe(14);
    });
    it('should increase the movie stock if input is valid', async () => {
        const res = await exec();
        const movieInDb = await Movie.findById(movieId);
        expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
    });
    it('should return the rental if input is valid', async () => {
        const res = await exec();
        expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining([
                'dateOut',
                'dateReturned',
                'rentalFee',
                'customer',
                'movie'
            ])
        );
    });
});