'use strict';

require('newrelic');
require('./lib/database');

var express = require('express');
var kraken = require('kraken-js');

var options = {
    onconfig: function(config, next) {
        next(null, config);
    }
};
var port = process.env.PORT || 8000;

var app = module.exports = express();
app.use(kraken(options));
app.on('start', function() {
    app.listen(port, function() {
        console.log('Listening on port %d for %s', port, app.kraken.get('env:env'));
    });
});
