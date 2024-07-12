var express = require('express');
var router = express.Router();
const { addPost, fstate,typePost ,fmonth,fAll} = require('../controller/post/post');
const { wrapper } = require('../utils/errorWrapper');
const checkAuth = require('../middleware/checkAuth');





router.post('/addpost',wrapper(addPost));
router.get('/typepost',checkAuth,wrapper(typePost));

router.get('/fstate',checkAuth,wrapper(fstate));
router.get('/fmonth',checkAuth,wrapper(fmonth));

router.get('/',wrapper(fAll));










module.exports = router;