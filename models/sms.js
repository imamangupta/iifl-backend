const mongoose = require('mongoose');


const smsSchema = new mongoose.Schema({
    dataType: {
        type: String
    },
    smsData: [ ],
    date: {
        type: Date,
        default: Date.now
    }
});

const Sms = mongoose.model('Sms', smsSchema);
Sms.createIndexes();
module.exports = Sms;