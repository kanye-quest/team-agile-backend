var PurityRpt = require('../../data/mongoose').PurityRpt;
var SavedLocations = require('../../data/mongoose').Location;

var addPurityRptCallback = function (req, res) {
    const rptData = req.body;
    SavedLocations.findOne({ locationId : rptData.location.locationId }, function (err, data) {
        if (err) {
            //database error when finding locationId
            res.status(500).send('Internal server error');
            console.log('Error when retrieving location from db');
        } else {
            if (data == null) {
                //no valid location
                res.status(400).send('Invalid location');
            } else {
                //get next report id
                PurityRpt.count({}, function (err, count) {
                    if (err) {
                        //unknown database error
                        res.status(500).send('Internal server error');
                        console.log('Error when accessing source report database');
                    } else {
                        //save report to database
                        var newRpt = new PurityRpt({
                            rptId : count,
                            rptDate : rptData.rptDate,
                            author : rptData.author,
                            locationId : rptData.location.locationId,
                            virusPPM : rptData.virusPPM,
                            contaminantPPM : rptData.contaminantPPM,
                            purityCondition : rptData.purityCondition
                        });
                        newRpt.save(function (err) {
                            if (err) {
                                //unknown db error
                                res.status(500).send('Internal Server Error');
                                console.log('Error when saving to purity rpt database');
                            } else {
                                //save successful
                                res.status(201).json({ rptId : count });
                                console.log('New purity report: %j\n', newRpt);
                            }
                        });
                    }
                });
            }
        }
    });
}

module.exports = addPurityRptCallback;
