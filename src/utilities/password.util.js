const bcrypt = require("bcryptjs");

const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const matchPassword = async (password, hashPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashPassword);

    return isMatch;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  hashPassword,
  matchPassword
};
