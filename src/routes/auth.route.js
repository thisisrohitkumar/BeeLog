const express = require("express");
const router = express.Router();
const {
  handleUserLogin,
  handleUserSignup,
  handleUserLogout,
} = require("../controllers/auth.controller");
const { checkAuthenticity } = require("../middlewares/checkAuthenticity");

router.post("/signup", checkAuthenticity, handleUserSignup);
router.post("/login", checkAuthenticity, handleUserLogin);
router.get("/logout", handleUserLogout);

module.exports = router;
