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
});