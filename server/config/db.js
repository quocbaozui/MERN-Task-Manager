const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected with mongoose ");
  } catch (error) {
    console.error("Error in connectDB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
