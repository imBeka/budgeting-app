const express = require('express')
const router = express.Router()
const {registerUser, getMe, loginUser} = require('../controller/userController')
const {protect} = require('../midware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router