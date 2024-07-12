var express = require('express');
var router = express.Router();
const { addPost,fAll} = require('../../controller/sms/branchShifting');
const { wrapper } = require('../../utils/errorWrapper');
const checkAuth = require('../../middleware/checkAuth');

router.post('/',checkAuth,wrapper(addPost));
router.get('/',checkAuth,wrapper(fAll));




module.exports = router;