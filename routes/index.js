var express = require('express');
var router = express.Router();

const user = require('./user')
router.use('/user', user);

const auth = require('./auth')
router.use('/auth', auth);

const sms = require('./sms')
router.use('/sms', sms);

const post = require('./post')
router.use('/post', post);



const postalAll = require('./postal/all')
router.use('/postal/all', postalAll);

const postalAuction = require('./postal/auction')
router.use('/postal/auction', postalAuction);

const postalDeficit = require('./postal/deficit')
router.use('/postal/deficit',postalDeficit );

const postalRefund = require('./postal/refund')
router.use('/postal/refund', postalRefund);

const postalBranchshifting = require('./postal/branchShifting')
router.use('/postal/branchShifting', postalBranchshifting);

const postalMtm = require('./postal/mtm')
router.use('/postal/mtm', postalMtm);





const smsAll = require('./sms/all')
router.use('/sms/all', smsAll);

const smsAuction = require('./sms/auction')
router.use('/sms/auction', smsAuction);

const smsDeficit = require('./sms/deficit')
router.use('/sms/deficit',smsDeficit );

const smsRefund = require('./sms/refund')
router.use('/sms/refund', smsRefund);

const smsBranchshifting = require('./sms/branchShifting')
router.use('/sms/branchShifting', smsBranchshifting);

const smsMtm = require('./sms/mtm')
router.use('/sms/mtm', smsMtm);






module.exports = router;