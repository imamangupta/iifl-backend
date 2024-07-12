const Configuration = require('../models/configuration')
const Email = require('../models/email')

let getConfiguration = async () => {
    let configuration = await Configuration.findOne()
    return configuration
}

let getEmail = async (key) => {
    let email = await Email.findOne({ key: key })

    return email
}
module.exports = {
    getConfiguration,
    getEmail
}