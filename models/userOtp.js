
const mongoose = require('mongoose')
const validator = require('mongoose-validator')
// const { dbConnection } = require('../config/db');


const userOtpSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    otp: {
        type: String,
    },
    referenceCode: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    expiryTime: {
        type: Date
    }

}, { timestamps: true })

// module.exports = dbConnection.model('UserOtp', userOtpSchema)
const UserOtp = mongoose.model('UserOtp', userOtpSchema);
UserOtp.createIndexes();
module.exports = UserOtp;
