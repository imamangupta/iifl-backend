const mongoose = require('mongoose')
const validator = require('mongoose-validator')
const bcrypt = require('bcrypt');
const { dbConnection } = require('../config/db');


const { Schema } = mongoose;

const UserSchema = new Schema({
// const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    fullName: {
        type: String,
    },
    designation:{
        type: String
    },
    password: {
        type: String,
        required: true, 
    },
    phoneNumber: {
        type: String,
        lowercase: true,
        trim: true,
        default: null
    },
    location: {
        type: String,
        default: null
    },
    entity: {
        type: String,
        default: null
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

const User = mongoose.model('users', UserSchema);
User.createIndexes();
module.exports = User;
