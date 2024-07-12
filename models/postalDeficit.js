const mongoose = require('mongoose')

const postalDeficitSchema = new mongoose.Schema({
    FILENAME: {
        type: String,
    },
    NOTICE_URL: {
        type: String,
    },
    TRACKING_URL: {
        type: String,
    },
    BARCODE: {
        type: String,
    },
    STATUS: {
        type: String,
    },
    CUSTOMER_NAME: {
        type: String,
    },
    MOBILE_NUMBER: {
        type: String,
    },
    DATE: {
        type: String,
    },
    STATE: {
        type: String,
    },
    CITY: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const PostalDeficit = mongoose.model('postalDeficit', postalDeficitSchema);
PostalDeficit.createIndexes();
module.exports = PostalDeficit;