const express = require('express')
const router = express.Router()
const { handleGetAllUsers, handleGetUserById, handleCreateNewUser } = require('../controllers/users.controller')

// Handling GET requests
router.get('/users', handleGetAllUsers)
router.get('/users/:id', handleGetUserById)

// Handling POST requests
router.post('/users', handleCreateNewUser)

module.exports = router