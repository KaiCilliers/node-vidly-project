/**
 * Dependencies
 */
const request = require('superTest');
const {Genre} = require('../../../models/genre');
const {User} = require('../../../models/user');
const mongoose = require('mongoose');

/**
 * Globals
 */
let server;

/**
 * Test Suite
 */
describe('/api/genres', () => {
    /**
     * Setup & Cleanup
     */
    beforeEach(() => { server = require('../../../index') });
    afterEach(async () => {
        await Genre.remove({});
        await server.close();
    });

    /**
     * TESTS
     */
    describe('GET /', () => {
        /**
         * TESTS
         */
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
            { name: 'genre1' },
            { name: 'genre2' }
        ]);

        const res = await request(server).get('/api/genres');

        expect(res.status).toBe(200);
        expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
        expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        /**
         * TESTS
         */
        // VALIDATION
        it('should return 404 if no genre with the given id exists', async () => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get(`/api/genres/${id}`);

            expect(res.status).toBe(404);
        });
        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/genres/1');

            expect(res.status).toBe(404);
        });

        // RESPONSE
        it('should return a genre if a valid id is passed', async () => {
            const genre = new Genre({ name: 'genre1' });
            await genre.save();

            const res = await request(server).get(`/api/genres/${genre._id}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });
    });

    describe('POST /', () => {
        /**
         * Locals
         */
        let token;
        let name;
        
        /**
         * Setup & Cleanup
         */
        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'genre1';
        });

        /**
         * Main Body
         */
        const exec = async () => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name });
        }
        
        /**
         * TESTS
         */
        // AUTH
        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        // VALIDATION
        it('should return 400 if genre less than 5 characters', async () => {
            name = '1234';
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return 400 if genre more than 50 characters', async () => {
            name = new Array(52).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        });

        // RESPONSE
        it('should save the genre if it is valid', async () => {
            await exec();
            const genre = await Genre.find({ name: 'genre1'});
            expect(genre).not.toBe(null);
        });
        it('should return the genre if it is valid', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });
    });

    describe('PUT /:id', () => {
        /**
         * Locals
         */
        let token;
        let newName;
        let genre;
        let id;

        /**
         * Setup & Cleanup
         */
        beforeEach(async () => {
            genre = new Genre({ name: 'genre1' });
            await genre.save();

            token = new User().generateAuthToken();
            id = genre._id;
            newName = 'updateName';
        });

        /**
         * Main Body
         */
        const exec = async () => {
            return await request(server)
                .put(`/api/genres/${id}`)
                .set('x-auth-token', token)
                .send({ name: newName });
        }

        /**
         * TESTS
         */
        // AUTH
        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        // VALIDATION
        it('should return 400 if genre is less than 5 characters', async () => {
            newName = '1234';
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return 400 if genre is more than 50 characters', async () => {
            newName = new Array(52).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return 404 if id is invalid', async () => {
            id = 1;
            const res = await exec();
            expect(res.status).toBe(404);
        });
        it('should return 404 if genre with the given id was not found', async () => {
            id = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404);
        });

        // RESPONSE
        it('should update the genre if input is valid', async () => {
            await exec();
            const updateGenre = await Genre.findById(genre._id);
            expect(updateGenre.name).toBe(newName);
        });
        it('should return the updated genre if it is valid', async () => {
            const res = await exec();
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', newName);
        });
    });

    describe('DELETE /:id', () => {
        /**
         * Locals
         */
        let token;
        let genre;
        let id;

        /**
         * Setup & Cleanup
         */
        beforeEach(async () => {
            genre = new Genre({ name: 'genre1' });
            await genre.save();

            token = new User({ isAdmin: true }).generateAuthToken();
            id = genre._id;
        });

        /**
         * Main Body for happy path
         */
        const exec = async () => {
            return await request(server)
                .delete(`/api/genres/${id}`)
                .set('x-auth-token', token)
                .send();
        }

        /**
         * TESTS
         */
        // AUTH
        it('should return 401 if client is nog logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });
        it('should return 403 if the user is not an admin', async () => {
            token = new User({ isAdmin: false }).generateAuthToken();
            const res = await exec();
            expect(res.status).toBe(403);
        });

        // VALIDATION
        it('should return 404 if id is invalid', async () => {
            id = 1;
            const res = await exec();
            expect(res.status).toBe(404);
        });
        it('should return 404 if no genre with the given id was found', async () => {
            id = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404);
        });

        // RESPONSE
        it('should delete the genre if input is valid', async () => {
            await exec();
            const genreInDb = await Genre.findById(id);
            expect(genreInDb).toBeNull();
        });
        it('should return the removed genre', async () => {
            const res = await exec();
            expect(res.body).toHaveProperty('_id', genre._id.toHexString());
            expect(res.body).toHaveProperty('name', genre.name);
        });
    });
});