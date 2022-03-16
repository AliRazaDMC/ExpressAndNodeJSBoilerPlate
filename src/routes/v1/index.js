const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const { swRoutes } = require('./products');

module.exports = {
    authRoutes,
    userRoutes,
    swRoutes
}