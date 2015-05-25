export default function() {
    return (req, res, next) => {
        let locality = req.cookies && req.cookies.locale || req.app.kraken.get('i18n').fallback;

        res.locals.context = {locality};

        next();
    };
}
