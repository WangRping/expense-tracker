const express = require('express')
const router = express.Router()
const user = require('./modules/users')
const home = require('./modules/home')

const { authenticator } = require('../middleware/auth')

router.use('/users', user)
router.use('/', authenticator, home)

module.exports = router