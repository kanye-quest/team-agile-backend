var User = require('../../data/mongoose').User;

var addUserCallback = function (req, res) {
    const userData = req.body;
    User.findOne({ username: userData.username }, function (err, data) {
        if (err) {
            //unknown database error
            res.status(500).send('Internal server error');
        } else {
            if (data == null) {
                //save user to db
                var newUser = new User({
                    username : userData.username,
                    password : userData.password,
                    authLevel : userData.authLevel,
                    locked : false,
                    email : userData.email,
                    firstName : userData.firstName,
                    lastName : userData.lastName
                });
                newUser.save(function(err) {
                    if (err) {
                        //unknown database error
                        res.status(500).send('Internal server error');
                    } else {
                        //save successful
                        res.status(201).json({ username: userData.username })
                        console.log('New user: %j\n', userData);
                    }
                });
            } else {
                //user already exists
                res.status(409).send('User already exists');
                console.log('user already exists:%s\n',userData.username)
            }
        }
    });
};

module.exports = addUserCallback;
