module.exports = function (req, res, next) {
    // assuming this middleware function will be executed after auth middleware
    // auth middleware sets req.user
    // 401 Unauthorised (try again, you might have given wrong token)
    // 403 Forbidden (stop trying, token is valid and you don't have access)
    if (!req.user.isAdmin) return res.status(403).send('Access denied');
    next();
}