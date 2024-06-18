const User = require("../models/user.model");
const { hashPassword, matchPassword } = require("../utilities/password.util");
const { generateToken } = require("../services/auth.service");

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.render("login", { msg: "Email does not exists" });
  } else if (!(await matchPassword(password, user.password))) {
    return res.render("login", { msg: "Invalid Password" });
  } else if(!user.isVerified){
    return res.render("verify", { msg: "Verification Pending", email });
  }else {
    const token = await generateToken(user);
    return res.cookie('jwt', token).redirect("/");
  }
};
const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const isExistingUser = await User.findOne({ email });
  if (isExistingUser) {
    return res.render("signup", { msg: "Email already exists" });
  } else {
    try {
      const hashedPassword = await hashPassword(password);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.render("verify", { email: newUser.email });
    } catch (error) {
      return res.render("signup", { msg: "Failed, Try again!" });
    }
  }
};

const handleUserLogout = (req, res) => {
  return res.clearCookie('jwt').render("login", { msg: "Logout Success" });
};

module.exports = {
  handleUserLogin,
  handleUserSignup,
  handleUserLogout,
};
