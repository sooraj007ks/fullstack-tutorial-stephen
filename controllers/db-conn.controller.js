const mongoose = require('mongoose');
const keys = require('../config/keys');
const mongoURI = keys.MONGO_URI;
// process.env.mongoURI || 'mongodb://localhost:27017/emaily-dev';

mongoose.connect(mongoURI);

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected Successfully.');
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('error', err => {
    console.log(`MongoDB Error: ${err}`);
});


process.on('SIGINT', () => {
    mongoose.connection.close()
        .then(() => {
            console.log('MongoDB disconnected (SIGINT)');
            process.exit(0);
        });
});

// For Heroku
process.on('SIGTERM', () => {
    mongoose.connection.close()
        .then(() => {
            console.log('MongoDB disconnected (SIGTERM)');
            process.exit(0);
        });
});

// For Nodemon
process.on('SIGUSR2', () => {
    mongoose.connection.close()
        .then(() => {
            console.log('MongoDB disconnected (SIGUSR2)');
            process.kill(process.pid, 'SIGUSR2');
        });
});

// Importing entire model
require('../models/user.model');
require('../models/survey.model');