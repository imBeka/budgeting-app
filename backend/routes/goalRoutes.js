const express = request('express')
const router = express.Router()
const {getGoals} = require('../controller/goalController')

router.get('/', getGoals)

module.exports = router