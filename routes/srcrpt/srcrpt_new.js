var SourceRpt = require('../../data/mongoose').SourceRpt;
var SavedLocations = require('../../data/mongoose').Location;

var addSourceRptCallback = function (req, res) {
    const rptData = req.body;
    console.log('Received: %j\n', rptData);
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
                SourceRpt.count({}, function (err, count) {
                    if (err) {
                        //unknown database error
                        res.status(500).send('Internal server error');
                        console.log('Error when accessing source report database');
                    } else {
                        //save report to database
                        var newRpt = new SourceRpt({
                            rptId : count,
                            rptDate : rptData.rptDate,
                            author: rptData.author,
                            locationId : rptData.location.locationId,
                            sourceType : rptData.sourceType,
                            sourceCondition : rptData.sourceCondition
                        });
                        newRpt.save(function(err) {
                            if (err) {
                                //unknown db error
                                res.status(500).send('Internal Server Error');
                            } else {
                                //save successful
                                res.status(201).json({ rptId : count });
                                console.log('New source report: %j\n', newRpt);
                            }
                        });
                    }
                });
            }
        }
    });
}

module.exports = addSourceRptCallback;
