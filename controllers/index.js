/* eslint new-cap: [2, {"capIsNewExceptions": ["TXTtoWeb", "XMLtoWeb"]}] */

import moment from 'moment';
import sitemap from 'express-sitemap';

import IndexModel from '../models/index';
import PlaceModel from '../models/place';

/**
 * TODO: doc
 *
 * @param {Object} req -
 * @param {function} callback -
 * @returns {Promise}
 */
function getSiteMap(req, callback) {
    return PlaceModel.findLastModified((error, place) => {
        if (error) {
            return callback(error);
        }

        let lastModified = moment.utc(place && place.dates.modified);

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
            },
            sitemapSubmission: '/sitemap.xml'
        }));
    });
}

export default function(router) {
    router.get('/', (req, res) => {
        res.render('index', new IndexModel());
    });

    router.get('/robots.txt', (req, res) => {
        getSiteMap(req, (error, siteMap) => {
            if (error) {
                throw error;
            }

            siteMap.TXTtoWeb(res);
        });
    });

    router.get('/sitemap.xml', (req, res) => {
        getSiteMap(req, (error, siteMap) => {
            if (error) {
                throw error;
            }

            siteMap.XMLtoWeb(res);
        });
    });
}
