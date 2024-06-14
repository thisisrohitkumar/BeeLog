const express = require('express');
const router = express.Router();
const { handleUserLogin} = require('../controllers/auth.controller')

router.post('/login', handleUserLogin);


module.exports = router;