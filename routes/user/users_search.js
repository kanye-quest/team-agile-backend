const User = require('../../data/mongoose').User;

var searchForUserCallback = function (req, res) {
    const queryUname = req.params.username;
    console.log('query username %s\n', queryUname);
    var user = User.findOne({ username: queryUname }, function (err, data) {
        if (err) {
            //unknown database error
            res.status(500).send('Internal server error');
        } else {
            if (data == null) {
                res.status(404).send('User not found');
            } else {
                res.status(200).json({
                    username : data.username,
                    password : data.password,
                    authLevel : data.authLevel,
                    email : data.email,
                    firstName : data.firstName,
                    lastName : data.lastName
                });
            }
            console.log('Data:%j',{data});
        }
    });
};

module.exports = searchForUserCallback;
