const request = require('superTest');
const {Genre} = require('../../models/genre');
const {User} = require('../../models/user');

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
            const res = await request(server).get('/api/genres/1');

            expect(res.status).toBe(404);
        });
    });

    /**
     * Amount of tests >= number of execution paths
     */
    describe('POST /', () => {

        /**
         * Refractoring Logic (Mosh's method)
         * 
         * Define the happy path, and then in each test,
         * we change one parameter that clearly aligns
         * with the name of the test
         */
        let token;
        let name;
        
        // Execute
        const exec = async () => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name }); // same as { name: name } works if key and value are the same
        }

        // Here you want to set the values of the happy path
        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'genre1';
        });

        // Authenticate (not happy)
        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });
        
        // Validation (not happy)
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

        // Happy Path
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
});