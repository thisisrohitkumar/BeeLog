require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const ejs = require('ejs')
const usersRoute = require('./routes/users.route')

const PORT = process.env.PORT || 8000
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

// Setting templating engine
app.set('view engine', 'ejs')
app.set('views', path.resolve('./src/views'))

// API Routes
app.get('/', (req, res) => {
    return res.render('index')
})

app.use('/api/v1', usersRoute)

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})