'use strict';

module.exports = function() {
    return function(req, res, next) {
        var host = req.protocol + '://' + (req.get('host') || req.hostname);

        res.locals.host = host;
        res.locals.req = req;
        res.locals.res = res;
        res.locals.session = req.session;
        res.locals.url = host + req.originalUrl;

        next();
    };
};
