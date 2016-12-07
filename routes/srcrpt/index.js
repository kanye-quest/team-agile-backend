const express = require('express');
const newRpt = require('./srcrpt_new');
var SourceRpt = require('../../data/mongoose').SourceRpt;
var SavedLocations = require('../../data/mongoose').Location;

var srcRptRouter = express.Router();

srcRptRouter.post('/', newRpt);
srcRptRouter.get('/', function (req, res) {
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
            SourceRpt.find({}, function (err, srcRpts) {
                if (err) {
                    //unknown database error
                    res.status(500).send('Internal server error');
                    console.log('Error when accessing source report database');
                } else {
                    var rptOut = [];
                    srcRpts.forEach(function (rpt) {
                        var rptSend = rpt.toJSON();
                        rptSend.location = locationMap[rpt.locationId];
                        delete rptSend.locationId;
                        rptOut.push(rptSend);
                    });
                    res.status(200).json(rptOut);
                }
            });
        }
    });
});

module.exports = srcRptRouter;
