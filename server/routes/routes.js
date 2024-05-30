const { test, regsiter, sendAadharOtp } = require('../controllers/controller')

const router = require('express').Router()

router.get('/test',test)
router.post('/auth/regsiter', regsiter)
router.post('/auth/aadharOtp', sendAadharOtp)


module.exports = router