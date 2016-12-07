const express = require('express');
const newUser = require('./users_new');
const singleUser = require('./users_search');
const updateUser = require('./users_update');

var users = express.Router();

users.get('/', function (req, res) {
    res.status(403).json({ error: 'forbidden' });
});
users.get('/:username', singleUser);
users.post('/', newUser);
users.put('/:username',updateUser);

module.exports = users;
