const request = require('superTest');

let server;

/**
 * Tests
 */
describe('/api/genres', () => {
    // This function will be called before each test
    beforeEach(() => { server = require('../../index'); });
    // This function will be called after each test
    afterEach(() => { server.close(); });

    describe('GET /', () => {
        it('should return all genres', async () => {
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
        });
    });
});