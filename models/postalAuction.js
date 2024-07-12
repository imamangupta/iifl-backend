const mongoose = require('mongoose')

const postalAuctionSchema = new mongoose.Schema({
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

// postalAuctionSchema.index({STATE:"text"});
const PostalAuction = mongoose.model('postalAuction', postalAuctionSchema);
PostalAuction.createIndexes();
module.exports = PostalAuction;