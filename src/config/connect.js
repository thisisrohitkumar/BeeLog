const mongoose = require("mongoose");

const connectToDb = async (URI) => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("Failed to connect to mongodb", error);
  }
};

module.exports = connectToDb;
