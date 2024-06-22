require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require('method-override');
const PORT = process.env.PORT;
const cookieParser = require('cookie-parser')
const connectToDb = require('./config/connect')
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const blogRoute = require('./routes/blog.route')
const commentRoute = require('./routes/comment.route')
const viewRoute = require('./routes/view.route')
const otpRouter = require("./routes/otp.route")

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve('./public')))
app.use(cookieParser())
app.use(methodOverride('_method'));
app.use('/users', userRoute)
app.use('/auth', authRoute)
app.use('/blogs', blogRoute)
app.use('/comments', commentRoute)
app.use(`/otp`, otpRouter);
app.use('/', viewRoute)

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

// Connect to mongodb
connectToDb(process.env.MONGODB_CONN_STRING)

app.listen(PORT, () => {
  console.log(`Server is listening to PORT ${PORT}`);
});
