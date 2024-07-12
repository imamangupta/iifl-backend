const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { getConfiguration, getEmail } = require('../../service/configuration');
const bcrypt = require('bcrypt');
const { createReferenceCode, getOtp } = require('../../utils/referenceCode');
const UserOtp = require('../../models/userOtp');
const { sendMail } = require('../../utils/sendEmail');
const moment = require('moment');
const Email = require('../../models/email');
const {JWT_SECRET} = require('../../config/config');


// working..,
exports.userLogin = async (req, res) => {

    // const token = req.headers.authorization.split(" ")[1];
    // return res.status(200).json({ message: 'User LoggedIn Successfuly', token });

    const { password } = req.body;

    let user = await User.findOne({
        email: req.body.email
    }).populate(
        {
            path: 'role',
        }
    );

    if (!user) {
        return res.status(404).json({ message: 'User not found. you have entered wrong email.' });
    }
    
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        return res.status(404).json({ message: 'Wrong password.' });
    }

    const newuser = await User.find({ _id: user._id }).select('-password')

    let { fullName, userName, email, mobileNumber, id } = user;
    let userObject = {
        fullName, userName, email, mobileNumber, id
    };
    let configuration = await getConfiguration();

    if (!user.role) {
        return res.status(400).json({ message: 'user has no role' });
    }
    userObject.roleName = user.role.name;

    const token = jwt.sign(
        userObject,
        `${configuration.secretKey}`,
        {
            expiresIn: `${configuration.jwtExpiredTime}`
        }
    );

    // const token = jwt.sign(
    //     userObject, JWT_SECRET
    // );

    let data = {
        token,
        userObject: newuser
    };
    if (user.role) {
        data.role = user.role.name;
    }

    return res.status(200).json({ message: 'User LoggedIn Successfuly', data });

};


// working..,
exports.userLoginWithOtp = async (req, res) => {
    const { email, referenceCode, otp } = req.body;

    let verifyUser = await UserOtp.findOne({ referenceCode: referenceCode, otp: otp, isVerified: false });
    let currentTime = moment(new Date());
    if (!verifyUser) {
        return res.status(400).json({ message: `INVALID OTP.` });
    }
    if (currentTime > verifyUser.expiryTime) {
        return res.status(400).json({ message: `OTP is expired.` });
    }

    let user = await User.findOne({
        email: req.body.email
    }).populate(
        {
            path: 'role',
        }
    );

    if (!user) {
        return res.status(404).json({ message: 'User not found. you have entered wrong email.' });
    }



    let { fullName, userName, mobileNumber, id } = user;
    let userObject = {
        fullName, userName, email, mobileNumber, id
    };
    let configuration = await getConfiguration();
    if (user.role) {
        userObject.roleName = user.role.name;
    }
    const token = jwt.sign(
        userObject,
        `${configuration.secretKey}`,
        {
            expiresIn: `${configuration.jwtExpiredTime}`
        }
    );
    const newuser = await User.find({ _id: user._id }).select('-password')
    let data = {
        token,
        userObject: newuser
    };
    if (user.role) {
        data.role = user.role.name;
    }

    return res.status(200).json({ message: 'User Created', data });
};


// working...
exports.chechStatus = async (req, res) => {
    return res.status(200).json({ message: 'success' });
};

//remaining..
exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    let userInfo = await User.findById(req.userData.id);
    if (!userInfo) {
        return res.status(200).json({ message: `User not found . Please contact Admin.` });
    }
    let checkPassword = await bcrypt.compare(oldPassword, userInfo.password);
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(newPassword, salt);
    if (checkPassword) {
        await User.findByIdAndUpdate(userInfo.id, { password: hashPass });

        return res.status(200).json({ message: 'Success' });
    } else {
        return res.status(400).json({ message: ' The password you entered is incorrect Please retype your current password.' });
    }
};



// working...
exports.sendOtp = async (req, res) => {
    const { email, otpFor } = req.body;
    let userDetails = await User.findOne({ email: email });

    if (!userDetails) {
        return res.status(400).json({ message: 'User does not exists, please contact to Admin' });
    }

    const otp = await getOtp();
    const referenceCode = await createReferenceCode(5);
    let configuration = await getConfiguration();
    let createdTime = moment(new Date());
    console.log(configuration.otpExpirationTimeInMinutes);
    let expiryTime = moment(createdTime).add(configuration.otpExpirationTimeInMinutes, 'm');

    await UserOtp.deleteMany({ email: email });
    await UserOtp.create({ email, otp, referenceCode, expiryTime });
    let emailDetails;
    let body;
    if (otpFor == 'forgotPassword') {
        emailDetails = await getEmail('forgotOtp');
        body = emailDetails.body.replace('#otp#', `${otp}`).replace('#userName#', `${userDetails.fullName}`)
    } else {
        emailDetails = await getEmail('login');
        body = emailDetails.body.replace('#otp#', `${otp}`).replace('#userName#', `${userDetails.fullName}`)
    }

    let data = await sendMail(email, `${emailDetails.subject}`, `${body} `, null);
    return res.status(200).json({ message: 'Otp send to your Email.', referenceCode: referenceCode });
};


// working...
exports.verifyOtp = async (req, res, next) => {
    let { referenceCode, otp } = req.body;
    let verifyUser = await UserOtp.findOne({ referenceCode: referenceCode, otp: otp, isVerified: false });
    let currentTime = moment(new Date());
    if (!verifyUser) {
        return res.status(400).json({ message: `INVALID OTP.` });
    }
    if (currentTime > verifyUser.expiryTime) {
        return res.status(400).json({ message: `OTP is expired.` });
    }

    await UserOtp.findByIdAndUpdate(verifyUser.id, { isVerified: true });

    return res.json({ message: "Success", referenceCode });
};


// remaining..
exports.updatePassword = async (req, res, next) => {
    const { referenceCode, newPassword } = req.body;
    var todayDateTime = new Date();

    let verifyUser = await UserOtp.findOne({ referenceCode: referenceCode, isVerified: true });

    if (!verifyUser) {
        return res.status(400).json({ message: `INVALID OTP.` });
    }
    let user = await User.findOne({ email: verifyUser.email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(newPassword, salt);
    await User.findByIdAndUpdate(user.id, { password: hashPass });
    await UserOtp.deleteMany({ email: verifyUser.email });

    return res.status(200).json({ message: 'Password Updated.' });
};

