const request = require('superTest');
const {Genre} = require('../../models/genre');

let server;

/**
 * Tests
 * 
 * Always start a test with a clean DB state
 * If you modify the DB, then clean up after
 * Treat it as the only test to be run
 */
describe('/api/genres', () => {
    // This function will be called before each test
    beforeEach(() => { server = require('../../index'); });
    // This function will be called after each test
    afterEach(async () => {
        server.close();
        // That is why you place it here
        await Genre.remove({});
    });

    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ]);

            // Every time you run this, it will add two new genres to database
            const res = await request(server).get('/api/genres');

            expect(res.status).toBe(200);
            // Less generic, although you are only testing that there are exactly two items in the array
            // expect(res.body.length).toBe(2);
            // More specific
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();

            // Problem is that if test fails, then this statement is not gona be reached
            // await Genre.remove({});
        });
    });

    describe('GET /:id', () => {
        it('should return a genre if a valid id is passed', async () => {
            const genre = new Genre({ name: 'genre1' });
            await genre.save();

            const res = await request(server).get(`/api/genres/${genre._id}`);

            expect(res.status).toBe(200);
            // This will fail due to comparing an objectID sting and array
            // expect(res.body).toMatchObject(genre);
            // This is better way to test it
            expect(res.body).toHaveProperty('name', genre.name);
        });
        it('should return 404 if invalid id is passed', async () => {
            // This will fail, due to the ID being validated first and returning a 500 error
            const res = await request(server).get('/api/genres/1');

            expect(res.status).toBe(404);
        });
    });
});