var Location = require('../../data/mongoose').Location;

var addLocationCallback = function (req, res) {
    const locData = req.body;
    Location.count({}, function (err, count) {
        if (err) {
            //unknown database error
            res.status(500).send('Internal server error');
            console.log('Error when accessing source report database');
        } else {
            var newLocation = new Location({
                locationId : count,
                name : locData.name,
                latitude : locData.latitude,
                longitude : locData.longitude
            });
            newLocation.save(function (err) {
                if (err) {
                    //unknown db error
                    res.status(500).send('Internal Server Error');
                    console.log('Error when saving to location database');
                } else {
                    res.status(201).json({ locationId : count });
                    console.log('New location: %j\n', newLocation);
                }
            });
        }
    });
}

module.exports = addLocationCallback;
