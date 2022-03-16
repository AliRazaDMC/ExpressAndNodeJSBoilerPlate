const express = require('express');

// VARIABLES
const router = express.Router();
const { authRoutes, userRoutes, swRoutes } = require('./v1');

const app_routes = [
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/user",
        route: userRoutes
    },
    {
        path: "/products",
        route: swRoutes
    }
];

app_routes.forEach(routes => {
    router.use(routes.path, routes.route);    
});

module.exports = router;