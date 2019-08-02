/**
 * Specific routes need this validation
 * to ensure only admin access.
 * 
 * These middleware gets passed to the...
    * router.get
    * router.post
    * router.put
    * router.delete
 * ...route handlers individually as needed
 */
module.exports = function (req, res, next) {
if (!req.user.isAdmin) return res.status(403).send('Access denied');
    next();
}