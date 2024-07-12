var express = require('express');
var router = express.Router();
const { allData,postalDataDownload, findState, findCity} = require('../../controller/postal/all');
const { wrapper } = require('../../utils/errorWrapper');
const checkAuth = require('../../middleware/checkAuth');


router.get('/',wrapper(allData));
router.get('/download',wrapper(postalDataDownload));
router.get('/getstate',wrapper(findState));
router.get('/getcity',wrapper(findCity));




module.exports = router;