const { body, query } = require("express-validator");
const User = require('../models/user')
exports.userCreateValidator = [
    body("fullName")
        .exists()
        .notEmpty()
        .withMessage('fullName required'),
    body('password')
        .exists()
        .withMessage('password required'),
    body('email')
        .exists()
        .notEmpty()
        .withMessage('email required')
        .custom(async value => {
            let checkUser = await User.findOne({ email: value.toLowerCase() })
            if (checkUser) {
                return Promise.reject("Email already exist.");
            }
        }),
    body('mobileNumber')
        .exists()
        .withMessage('mobileNumber required')
        .custom(async value => {
            let checkUser = await User.findOne({ mobileNumber: value })
            if (checkUser) {
                return Promise.reject("Mobile Number already exist.");
            }
        })
]

exports.userCreateByAdminValidator = [
    body("fullName")
        .exists()
        .notEmpty()
        .withMessage('firstName required'),
    body('password')
        .exists()
        .withMessage('password required'),
    body('email')
        .exists()
        .notEmpty()
        .isEmail()
        .withMessage('email required')
        .custom(async value => {
            let checkUser = await User.findOne({ email: value })
            if (checkUser) {
                return Promise.reject("Email already exist.");
            }
        }),
    body('mobileNumber')
        .exists()
        .withMessage('mobileNumber required')
        .isLength(10)
        .custom(async value => {
            let checkUser = await User.findOne({ email: value })
            if (checkUser) {
                return Promise.reject("Mobile Number already exist.");
            }
        }),
    body('role')
        .exists()
        .notEmpty()
        .withMessage('role required')
        .exists()
        .notEmpty()
        .withMessage('id required')
        // .custom(async value => {
        //     if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        //         return Promise.reject("Invalid id.");
        //     }
        // })
]

exports.getSingleUserValidator = [
    query('id')
        .exists()
        .notEmpty()
        .withMessage('id required')
        .custom(async value => {
            if (!value.match(/^[0-9a-fA-F]{24}$/)) {
                return Promise.reject("Invalid id.");
            }
        })

]

exports.deleteSingleUserValidator = [
    query('id')
        .exists()
        .notEmpty()
        .withMessage('id required')
        .custom(async value => {
            if (!value.match(/^[0-9a-fA-F]{24}$/)) {
                return Promise.reject("Invalid id.");
            }
        })
]

exports.updateSingleUserValidator = [
    query('id')
        .exists()
        .notEmpty()
        .withMessage('id required')
        .custom(async value => {
            if (!value.match(/^[0-9a-fA-F]{24}$/)) {
                return Promise.reject("Invalid id.");
            }
        }),
    // .custom(async (value, { req }) => {
    //     let checkUser = await User.findOne({ userName: value, id: {  $ne: req.query.id } })
    //     if (checkUser) {
    //         return Promise.reject("User Name already exist.");
    //     }
    // }),
    body("fullName")
        .exists()
        .notEmpty()
        .withMessage('fullName required'),
    body('mobileNumber')
        .exists()
        .withMessage('mobileNumber required'),
    // body('role')
    //     .exists()
    //     .notEmpty()
    //     .withMessage('role required')
    //     .exists()
    //     .notEmpty()
    //     .withMessage('id required')
    //     .custom(async value => {
    //         if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    //             return Promise.reject("Invalid id.");
    //         }
    //     })

]
