const express = require('express');
const router = express.Router();
const { handleVerifyOtp, handleSendOpt} = require('../controllers/otp.controller')

router.post('/sendOtp', handleSendOpt)
router.post('/verifyOtp', handleVerifyOtp)

module.exports = router