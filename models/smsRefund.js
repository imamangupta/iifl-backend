const mongoose = require('mongoose')

const smsRefundSchema = new mongoose.Schema({
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

const SmsRefund = mongoose.model('smsRefund', smsRefundSchema);
SmsRefund.createIndexes();
module.exports = SmsRefund;