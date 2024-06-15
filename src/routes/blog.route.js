const express = require('express')
const router = express.Router()
const { checkIfUserLoggedIn } = require('../middlewares/checkAuthenticity')
const { createNewBlog, getAllBlogs, getBlogById} = require('../controllers/blog.controller')

router.post('/', checkIfUserLoggedIn, createNewBlog)
router.get('/', getAllBlogs)
router.get('/:id', getBlogById)

module.exports = router