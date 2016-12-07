const express = require('express');
const newRpt = require('./purityrpt_new');
var PurityRpt = require('../../data/mongoose').PurityRpt;
var SavedLocations = require('../../data/mongoose').Location;

var purityRptRouter = express.Router();

purityRptRouter.post('/', newRpt);
purityRptRouter.get('/', function (req, res) {
    SavedLocations.find({}, function (err, locations) {
        if (err) {
            //database error when fetching locations
            res.status(500).send('Internal server error');
            console.log('Error when retrieving location database');
        } else {
            var locationMap = {};
            locations.forEach(function (loc) {
                locationMap[loc.locationId] = loc;
            });
            PurityRpt.find({}, function (err, purityRpts) {
                if (err) {
                    //unknown database error
                    res.status(500).send('Internal server error');
                    console.log('Error when accessing source report database');
                } else {
                    var rptOut = purityRpts.map(function (rpt) {
                        var rptSend = rpt.toJSON();
                        rptSend.location = locationMap[rpt.locationId];
                        delete rptSend.locationId;
                        return rptSend;
                    });
                    res.status(200).json(rptOut);
                }
            });
        }
    });
});

module.exports = purityRptRouter;
