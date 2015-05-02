'use strict';

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db connection open');
});

module.exports = db;
