const User = require("../models/user.model");
const { hashPassword, matchPassword } = require("../utilities/password.util");
const { generateToken } = require("../services/auth.service");

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send("Email not exist");
  } else if (!(await matchPassword(password, user.password))) {
    return res.status(401).send("invalid password");
  } else {
    const token = await generateToken(user);
    return res.cookie("jwt", token).send("Login Success");
  }
};
const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const isExistingUser = await User.findOne({ email });
  if (isExistingUser) {
    return res.status(401).send("User already exists");
  } else {
    try {
      const hashedPassword = await hashPassword(password);

      await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.status(201).send("Signup Success, plz login");
    } catch (error) {
      return res.status(401).send("Failed to signup");
    }
  }
};

const handleUserLogout = (req, res) => {
  return res.clearCookie("jwt").send("logout success");
};

module.exports = {
  handleUserLogin,
  handleUserSignup,
  handleUserLogout,
};
