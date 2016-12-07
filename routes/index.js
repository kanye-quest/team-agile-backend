const express = require('express');
const location = require('./location');
const purityrpt = require('./purityrpt');
const srcrpt = require('./srcrpt');
const users = require('./user');

var routes = express.Router();

routes.use('/location', location);
routes.use('/purityrpt', purityrpt);
routes.use('/srcrpt', srcrpt);
routes.use('/user', users);
routes.get('/', function (req, res) {
    res.status(403).send('Forbidden');
});

module.exports = routes;
