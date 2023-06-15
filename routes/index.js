const express = require('express')
const router = express.Router()
const user = require('./modules/users')

const { authenticator } = require('../middleware/auth')


router.use('/users', user)

module.exports = router