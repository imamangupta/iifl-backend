const mongoose = require('mongoose');
const validator = require('mongoose-validator');
// const { dbConnection } = require('../config/db');

const configurationSchema = new mongoose.Schema({
    secretKey: {
        type: String
    },
    jwtExpiredTime: {
        type: String,
    },
    authFailedUrl: {
        type: String,
    },
    otpExpirationTimeInMinutes: {
        type: String,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

// module.exports = dbConnection.model('Configuration', configurationSchema);

const Configuration = mongoose.model('Configuration', configurationSchema);
Configuration.createIndexes();
module.exports = Configuration;
