const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const routes = require('./routes');

var app = express();
// parse incoming JSON requests
app.use(bodyParser.json());

app.use('/', routes);

var server = app.listen(2340, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("LISTEN http://%s:%s", host,port);
});
