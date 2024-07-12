const User = require('../../models/user')
const { paginationWithFromTo } = require('../../utils/pagination')
const Role = require('../../models/role')
const { sendMail } = require('../../utils/sendEmail')
const mongoose = require('mongoose')
const { getConfiguration ,getEmail} = require('../../service/configuration')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// const csv = require('csvtojson');
// const fs = require('fs');
// const role = require('../../models/role')
// const appConstant = require("../../constants/appConstant");

// const {JWT_SECRET} = require('../../config/config');

exports.addUser = async (req, res) => {

    let { userName, fullName, password, email, mobileNumber, role, branchId, designation, entity, location } = req.body

    if (!req.userData) {
        let getUserRole = await Role.findOne({ name: role })
        console.log(getUserRole);
        role = getUserRole.id
    }

    let id
    let phoneNumber = mobileNumber;
    let createdBy
    if (req.userData) {
        id = new mongoose.Types.ObjectId();
        createdBy = req.userData.id
    } else {
        id = new mongoose.Types.ObjectId();
        createdBy = id
    }


    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);


    let user = await User.create({
        _id: id,
        userName: userName,
        fullName: fullName,
        entity:entity,
        location: location,
        designation: designation,
        password: hashPass,
        email:email,
        phoneNumber: phoneNumber,

        mobileNumber: mobileNumber,
        role: role,
        createdBy: createdBy,
        // branchId
    })

    
    
    let newUser = await User.findById(user.id).populate({
        path: 'role'
    })
    let myUser = await User.findById(user.id).select('-password')
    
    let userObject = {
        fullName: newUser.fullName,
        userName: newUser.userName,
        email: newUser.email,
        mobileNumber: newUser.mobileNumber,
        id: newUser.id
    }


    let configuration = await getConfiguration()

    if (newUser.role) {
        userObject.roleName = newUser.role.name
    }


    const token = jwt.sign(
        userObject,
        `${configuration.secretKey}`,
        {
            expiresIn: `${configuration.jwtExpiredTime}`
        }
    );

    let data = {
        token
    }

    data.userObject = myUser
    if (newUser.role) {
        data.role = newUser.role.name
    }

    let emailDetails = await getEmail('registerUser')
    let subject = emailDetails.subject.replace('#userName#', `${fullName}`)
    let body = emailDetails.body.replace('#email#', `${email}`).replace('#password#', `${password}`).replace('#userName#', `${fullName}`)
    let cc = emailDetails.toObject().cc
    await sendMail(email, `${subject}`, `${body}`, `${cc}`)
    return res.status(201).json({ message: 'User Created', data })

}




exports.getUser = async (req, res) => {

    let searchQuery = {}
    let user = await User.find(searchQuery).select('-password')

    // let count = await User.count(searchQuery)
    if (!User) {
        return res.status(404).json({ message: 'User Not found' })
    } else {
        return res.status(200).json({ message: 'success', data: { user } })
    }

}


exports.getSingleUser = async (req, res) => {

    console.log('working...');
    res.send({ message: 'Working Get Single User' });
}

exports.updateUser = async (req, res) => {

    console.log('working...');
}


exports.deleteUser = async (req, res) => {

    console.log('working...');
}

exports.userUpload = async (req, res) => {
    console.log('working...');
}

exports.addAdmin = async (req, res) => {
    console.log('working...');
}

exports.sendEmail = async (req, res) => {

    console.log('working...');

}


