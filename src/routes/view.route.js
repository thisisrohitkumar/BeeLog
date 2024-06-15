const express = require("express");
const { checkAuthenticity, checkIfUserLoggedIn } = require("../middlewares/checkAuthenticity");
const { checkAuthority } = require("../middlewares/checkAuthority");
const { verifyToken } = require("../services/auth.service");
const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) {
    return res.render("home");
  }
  const user = await verifyToken(token);
  return res.render("home", {user});
});

router.get("/signup", checkAuthenticity, (req, res) => {
  return res.render("signup");
});

router.get("/login", checkAuthenticity, (req, res) => {
  return res.render("login");
});

router.get("/dashboard", checkIfUserLoggedIn, async (req, res) => {
    const token = req.cookies["jwt"];
    if (!token) {
      return res.render("home");
    }
    const user = await verifyToken(token);
    return res.render("dashboard", {user});
});

module.exports = router;
