const User = require('../../data/mongoose').User;

var updateUserCallback = function (req, res) {
    const queryUname = req.params.username;
    const userData = req.body;
    console.log('query username %s\n', queryUname);
    var user = User.findOne({ username: queryUname }, function (err, data) {
        if (err) {
            //unknown database error
            res.status(500).send('Internal server error');
        } else {
            if (data == null) {
                res.status(404).send('User not found');
            } else {
                var modUser = new User({
                    username : userData.username,
                    password : userData.password,
                    authLevel : userData.authLevel,
                    locked : false,
                    email : userData.email,
                    firstName : userData.firstName,
                    lastName : userData.lastName
                });
                modUser.save(function(err) {
                    if (err) {
                        //unknown database error
                        res.status(500).send('Internal server error');
                    } else {
                        //save successful
                        res.status(201).json({ username: userData.username })
                        console.log('New user: %j\n', userData);
                    }
                });
            }
            console.log('Data:%j',{data});
        }
    });
};

module.exports = updateUserCallback;
