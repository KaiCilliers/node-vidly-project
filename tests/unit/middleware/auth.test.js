/**
 * Dependencies
 */
const {User} = require('../../../models/user');
const auth = require('../../../middleware/auth');
const mongoose = require('mongoose');

describe('auth middleware', () => {
    /**
     * TESTS
     */
    it('should populate req.user with the payload of a valid JWT', () => {
        /**
         * Create valid user to use as comparison
         */
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        };
        const token = new User(user).generateAuthToken();
        
        /**
         * Mock req,res,next parameters
         */
        const req = {
            header: jest.fn().mockReturnValue(token)
        };
        const res = {};
        const next = jest.fn();
        
        auth(req, res, next);

        /**
         * Asserts
         */
        expect(req.user).toBeDefined();
        expect(req.user).toMatchObject(user);
    });
});