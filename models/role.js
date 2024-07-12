const mongoose = require('mongoose')
const validator = require('mongoose-validator')
// const { dbConnection } = require('../config/db');


const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User Name required"]
    },
    description: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

// module.exports = dbConnection.model('Role', RoleSchema)

const Role = mongoose.model('Role', RoleSchema);
Role.createIndexes();
module.exports = Role;
