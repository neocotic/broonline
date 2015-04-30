'use strict';

var app = require('./index');
var http = require('http');

/*
 * Create and start HTTP server.
 */

var server = http.createServer(app);
server.listen(process.env.PORT || 8000);
server.on('listening', function() {
    console.log('Server listening on http://localhost:%d', this.address().port);
});
