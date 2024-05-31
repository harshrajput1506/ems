const { test, regsiter, sendAadharOtp, loginOtp, loginVerifyOtp } = require('../controllers/auth.controller')

const router = require('express').Router()

router.get('/test',test)
router.post('/auth/regsiter', regsiter)
router.post('/auth/aadharOtp', sendAadharOtp)
router.post('/auth/loginOtp', loginOtp )
router.post('/auth/login', loginVerifyOtp)


module.exports = router