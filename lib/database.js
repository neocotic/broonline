'use strict';

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI);

var db = mongoose.connection;
db.on('error', function(error) {
    console.error('Database connection error:', error);
});
db.once('open', function() {
    console.log('Database connected on port %d', this.db.serverConfig.port);
});

module.exports = db;
