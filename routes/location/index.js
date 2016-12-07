const express = require('express');
const newLoc = require('./location_new');
const searchLoc = require('./location_search');
var Locations = require('../../data/mongoose').Location;

var locationRouter = express.Router();

locationRouter.post('/', newLoc);
locationRouter.get('/:locationId', searchLoc);
locationRouter.get('/', function (req, res) {
    Locations.find({}, function (err, locations) {
        if (err) {
            //database error when fetching locations
            res.status(500).send('Internal server error');
            console.log('Error when retrieving location database');
        } else {
            var locsOut = [];
            locations.forEach(function (location) {
                locsOut.push(location.toJSON());
            });
            res.status(200).json(locsOut);
        }
    })
});

module.exports = locationRouter;
