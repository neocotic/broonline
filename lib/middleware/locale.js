'use strict';

module.exports = function() {
    return function(req, res, next) {
        var locale = ((req.cookies && req.cookies.locale) || req.app.kraken.get('i18n').fallback);

        res.locals.context = { locality: locale };

        next();
    };
};
