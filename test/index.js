/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';

var kraken = require('kraken-js');
var express = require('express');
var request = require('supertest');

describe('/', function() {

    var app, mock;

    beforeEach(function(done) {
        app = express();
        app.on('start', done);
        app.use(kraken({
            basedir: process.cwd()
        }));

        mock = app.listen(1337);
    });

    afterEach(function(done) {
        mock.close(done);
    });

    it('should say "broon line"', function (done) {
        request(mock)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/)
            .expect(/broon line/)
            .end(function(err, res) {
                done(err);
            });
    });

});
