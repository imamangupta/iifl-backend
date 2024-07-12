const mongoose = require('mongoose');
const validator = require('mongoose-validator');
// const { dbConnection, } = require('../config/db');

const emailSchema = new mongoose.Schema({
    key: {
        type: String
    },
    subject: {
        type: String,
    },
    body: {
        type: String,
    }
});

// module.exports = dbConnection.model('Email', emailSchema);

const Email = mongoose.model('Email', emailSchema);
Email.createIndexes();
module.exports = Email;
