const express = require('express')
const router = express.Router()
const { checkAuthority } = require('../middlewares/checkAuthority')
const { getAllUsers, getUserById } = require('../controllers/user.controller')

router.get('/', checkAuthority('admin'), getAllUsers)
router.get('/:id', checkAuthority(''), getUserById)

module.exports = router