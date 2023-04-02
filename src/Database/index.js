const mongoose = require('mongoose');

class dbConnection {
    constructor(client) {
        this.client = client;
    }

    initialize() {
        try {
            mongoose.connect(process.env.MONGO_CONNECTION_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            const database = mongoose.connection;
            
            database.on('error', (err) => {
                this.client.logger.error(err.stack, 'Database');
            });
            
            database.once('open', () => {
                this.client.logger.info('Database loaded successfully.', 'Database');
            });
        } catch (err) {
            this.client.logger.error('An error occurred while connecting to the database.', 'Database');
        }
    }
}

module.exports = { dbConnection };