var express = require('express');
var router = express.Router();
const { allData,postalDataDownload, findState, findCity, chartData} = require('../../controller/postal/all');
const { wrapper } = require('../../utils/errorWrapper');
const checkAuth = require('../../middleware/checkAuth');


router.get('/',checkAuth,wrapper(allData));
router.get('/download',checkAuth,wrapper(postalDataDownload));
router.get('/getstate',wrapper(findState));
router.get('/getcity',wrapper(findCity));
router.get('/getchart',wrapper(chartData));




module.exports = router;