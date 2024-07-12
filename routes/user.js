var express = require('express');
var router = express.Router();
const validationError = require('../middleware/validationError');
const checkAuth = require('../middleware/checkAuth');
const { wrapper } = require('../utils/errorWrapper');

const { addUser, getUser, getSingleUser, updateUser, deleteUser, userUpload, addAdmin, sendEmail } = require('../controller/user/user');
// const multer = require('multer');

const { userCreateValidator, userCreateByAdminValidator, getSingleUserValidator, deleteSingleUserValidator, updateSingleUserValidator } = require('../validator/user');




router.post('/', userCreateValidator, validationError, wrapper(addUser));

router.get('/', checkAuth, validationError, wrapper(getUser));




// router.post('/add-user-admin', checkAuth, userCreateByAdminValidator,validationError, wrapper(addUser));

// router.post('/', userCreateValidator, validationError, wrapper(addUser));

// router.get('/', checkAuth, validationError, wrapper(getUser));

// router.get('/single-user', checkAuth, getSingleUserValidator, validationError, wrapper(getSingleUser));

// router.put('/', checkAuth, updateSingleUserValidator, validationError, wrapper(updateUser));

// router.delete('/', checkAuth, deleteSingleUserValidator, validationError, wrapper(deleteUser));

// router.post('/upload', upload.single('csv'), checkAuth, wrapper(userUpload));

// router.post('/add-admin', wrapper(addAdmin));

// router.post('/send-email', wrapper(sendEmail));



module.exports = router;
