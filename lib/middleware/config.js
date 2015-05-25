export default function() {
    return (req, res, next) => {
        res.locals.config = req.app.kraken.get('app');

        next();
    };
}
