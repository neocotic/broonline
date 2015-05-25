import './lib/database';
import express from 'express';
import kraken from 'kraken-js';

let options = {
    onconfig(config, next) {
        next(null, config);
    }
};
let port = process.env.PORT || 8000;

let app = express();
app.use(kraken(options));
app.on('start', () => {
    app.listen(port, () => {
        console.log(`Listening on port ${port} for ${app.kraken.get('env:env')}`);
    });
});

export default app;
