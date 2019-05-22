const express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
const path = require('path');
const cors = require('cors');
var logger = require('morgan');
const bodyParser = require('body-parser');

const friends = require('./routes/friends');

const port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const connection = require('./config/database/database');
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

app.use(cors());
app.get('/', (req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    res.send('its home');
    next();
});

app.use(logger('dev'));
app.use('', friends);
server.listen(port, () => {
    console.log('Server started on port ' + port);
});