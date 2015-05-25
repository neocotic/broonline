import mongoose from 'mongoose';

mongoose.connect(process.env.MONGOLAB_URI);

let db = mongoose.connection;
db.on('error', (error) => {
    console.error('Database connection error:', error);
});
db.once('open', function() {
    console.log(`Database connected on port ${this.db.serverConfig.port}`);
});

export default db;
