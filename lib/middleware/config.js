'use strict';

module.exports = function() {
    return function(req, res, next) {
        res.locals.config = req.app.kraken.get('app');
        next();
    };
};
