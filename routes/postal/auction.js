var express = require('express');
var router = express.Router();
const { addPost,fAll} = require('../../controller/postal/auction');
const { wrapper } = require('../../utils/errorWrapper');
const checkAuth = require('../../middleware/checkAuth');

router.post('/',checkAuth,wrapper(addPost));
router.get('/',wrapper(fAll));




module.exports = router;