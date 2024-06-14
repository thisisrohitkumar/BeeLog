require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT;
const authRoute = require("./routes/auth.route");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/auth", authRoute);

//Setting view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`Server is listening to PORT ${PORT}`);
});
