var express = require('express');
var router = express.Router();
const { allData,smsDataDownload, findState, findCity} = require('../../controller/sms/all');
const { wrapper } = require('../../utils/errorWrapper');
const checkAuth = require('../../middleware/checkAuth');


router.get('/',wrapper(allData));
router.get('/download',wrapper(smsDataDownload));
router.get('/getstate',wrapper(findState));
router.get('/getcity',wrapper(findCity));




module.exports = router;