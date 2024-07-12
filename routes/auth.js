var express = require('express');
var router = express.Router();
const { userLogin, userLoginWithOtp, changePassword, sendOtp, verifyOtp, updatePassword, chechStatus } = require('../controller/auth/auth');
const { wrapper } = require('../utils/errorWrapper');
const checkAuth = require('../middleware/checkAuth');





router.post('/change-password',checkAuth, wrapper(changePassword));






router.get('/check-status', wrapper(chechStatus));

router.post('/login-otp', wrapper(userLoginWithOtp));

router.post('/login', wrapper(userLogin));

router.post('/send-otp', wrapper(sendOtp));

router.post('/verify-otp', wrapper(verifyOtp));

router.post('/update-password', wrapper(updatePassword));



// router.post('/login', wrapper(userLogin));

// router.post('/login-otp', wrapper(userLoginWithOtp));

// router.get('/check-status', wrapper(chechStatus));

// router.post('/change-password', checkAuth, wrapper(changePassword));

// router.post('/send-otp', wrapper(sendOtp));

// router.post('/verify-otp', wrapper(verifyOtp));

// router.post('/update-password', wrapper(updatePassword));


module.exports = router;