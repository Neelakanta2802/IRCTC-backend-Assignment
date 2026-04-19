const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongoose connected to MongoDB jaiBabu");
  } catch (error) {
    console.error("Mongoose connection error:", error);
  }
}

module.exports = connectDB;
