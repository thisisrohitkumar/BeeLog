const mongoose = require("mongoose");

const connectToDb = async (URI) => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed To connect to mongodb", error);
  }
};

module.exports = connectToDb;
