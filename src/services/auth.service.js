const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  try {
    const token = await jwt.sign(payload, process.env.JWT_SECRET);
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyToken = async (token) => {
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        return payload;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    generateToken,
    verifyToken
}
