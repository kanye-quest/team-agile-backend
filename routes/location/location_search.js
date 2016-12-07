var Location = require('../../data/mongoose').Location;

var searchForLocationCallback = function (req, res) {
    const queryId = req.params.locationId;
    console.log('query locationId %d\n', queryId);
    var location = Location.findOne({ locationId : queryId }, function (err, data) {
        if (err) {
            //unknown database error
            res.status(500).send('Internal server error');
        } else {
            if (data == null) {
                res.status(404).send('Location not found');
            } else {
                res.status(200).json(data.toJson());
            }
            console.log('Data:%j',data.toJson());
        }
    });
}

module.exports = searchForLocationCallback;
