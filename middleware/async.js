/**
 * Middleware to surround each route handler
 * with a try/catch block
 * 
 * These middleware gets passed to the...
    * router.get
    * router.post
    * router.put
    * router.delete
 * ...route handlers individually as needed
 */
module.exports = function asyncMiddleware(handler) {
    return async (req, res, next) => {
        try{
            await handler(req, res);
        } catch(ex) {
            next(ex);
        }
    };
}