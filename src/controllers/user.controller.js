const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort([['createdAt', -1]]);
    return res.status(201).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(401).send("User not found");
    } else {
      return res.status(200).send(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllUsers,
  getUserById,
};
