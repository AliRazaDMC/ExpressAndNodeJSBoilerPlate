require('dotenv').config()
const express = require('express');
const httpStatus = require('http-status');

// VARIABLES
const app = express();
const port = process.env.APP_PORT;
const routes = require('./routes');

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded());

// ROUTER MIDDLEWARE
app.use(process.env.APP_VERSION, routes);

// ERROR HANDLER FOR ALL OTHER EXCEPTIONS
app.use( (error, req, res, next) => {
    console.log(error);
    res.status( error.status )
        .send(error)
});

// RUNNING SERVER AND PORT
app.listen(port, () => {
    console.log('App is running on port: '+port);
});