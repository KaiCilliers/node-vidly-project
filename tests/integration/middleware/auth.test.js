/**
 * Dependencies
 */
const request = require('superTest');
const {Genre} = require('../../../models/genre');
const {User} = require('../../../models/user');

/**
 * Globals
 */
let server;

describe('auth middleware', () => {
    /**
     * Setup and house cleaning
     */
    beforeEach(() => { server = require('../../../index') });
    afterAll(async () => {
        await Genre.remove({});
        await server.close(); // important to await this promise
    });

    /**
     * Local Global Token
     */
    let token;

    /**
     * Local Setup
     */
    beforeEach(() => {
        token = new User().generateAuthToken();
    });
    
    /**
     * Main Body for successful paths
     */
    const exec = async () => {
        return await request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'genre1'});
    }

    /**
     * TESTS
     */
    it('should return 401 if no token is provided', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });
    it('should return 400 if token is invalid', async () => {
        token = 'a';
        const res = await exec();
        expect(res.status).toBe(400);
    });
    it('should return 200 if token is valid', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });
});