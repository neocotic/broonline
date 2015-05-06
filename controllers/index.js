'use strict';

var moment = require('moment');
var sitemap = require('express-sitemap');

var IndexModel = require('../models/index');
var PlaceModel = require('../models/place');

module.exports = function(router) {

    router.get('/', function(req, res) {
        res.render('index', new IndexModel());
    });

    router.get('/robots.txt', function(req, res) {
        getSiteMap(req, function(error, siteMap) {
            if (error) {
                throw error;
            }

            siteMap.TXTtoWeb(res);
        });
    });

    router.get('/sitemap.xml', function(req, res) {
        getSiteMap(req, function(error, siteMap) {
            if (error) {
                throw error;
            }

            siteMap.XMLtoWeb(res);
        });
    });

    function getSiteMap(req, callback) {
        PlaceModel.findLastModified(function(error, place) {
            if (error) {
                return callback(error);
            }

            var lastModified = moment.utc(place && place.dates.modified);

            callback(null, sitemap({
                url: req.hostname,
                map: {
                    '/': ['get']
                },
                route: {
                    '/': {
                        changefreq: 'always',
                        lastmod: lastModified.format(),
                        priority: 1
                    }
                }
            }));
        });
    }
};
